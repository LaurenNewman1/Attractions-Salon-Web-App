import React, { useState, useEffect } from 'react';
import {
  MobileStepper, Button, Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {
  KeyboardArrowLeft, KeyboardArrowRight,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import Page from '../components/Page';
import useStyles from '../css/BookStyles';
import Details from './Details';
import Calendar from './Calendar';
import NewPayment from './NewPayment';
import ConfirmPayment from './ConfirmPayment';
import ServiceUnavailable from './ServiceUnavailable';
import ReviewBooking from './ReviewBooking';
import useBooking from '../stores/BookStore';

const Book = ({
  userData, newCardToUser, updateCardForUser, getCards, newCardCheck, loggedIn,
}) => {
  const params = useParams();
  const [cardSelected, setCardSelected] = useState(false);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [changeClicked, setChangeClicked] = useState(false);
  const [cancelPressed, setCancelPressed] = useState(false);
  const [booking, setBooking] = useState({
    name: userData ? userData.name : '',
    email: userData ? userData.email : '',
    phone_number: userData ? userData.phone_number : '',
    confirmed: false,
    timeOrdered: new Date(Date.now()).toISOString(),
    time: new Date(Date.now()).toISOString(),
    service: params ? params.id : '',
    addons: [],
    specialist: '',
    notes: '',
    payInStore: false,
    currency: 'USD',
    // This is the cardId
    method_id: '',
    // This needs to be in pennies, so times 100
    amount: '',
  });
  const classes = useStyles();
  const [loading, specialists, services, sendRequest] = useBooking();
  const [creditCard, setCreditCard] = useState({
    name: userData ? userData.name : '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    CVC: '',
    cardId: '',
    last4: '',
  });
  const [finalCreditCard, setFinalCreditCard] = useState({
    name: userData ? userData.name : '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    CVC: '',
    cardId: '',
    last4: '',
  });
  const [CCFlag, setCCFlag] = useState(false);
  const [changeCard, setChangeCard] = useState(false);
  const [noPrice, setNoPrice] = useState(false);

  const updateBooking = (...argus) => {
    const newFields = { ...booking };
    argus.forEach((argu) => {
      const [fieldName, val] = argu;
      newFields[fieldName] = val;
    });
    setBooking(newFields);
  };

  const updateCreditCard = async (...argus) => {
    const newFields = { ...creditCard };
    argus.forEach((argu) => {
      const [fieldName, val] = argu;
      newFields[fieldName] = val;
    });
    setCreditCard(newFields);
  };

  const updateFinalCreditCard = async (...argus) => {
    const newFields = { ...finalCreditCard };
    argus.forEach((argu) => {
      const [fieldName, val] = argu;
      newFields[fieldName] = val;
    });
    setFinalCreditCard(newFields);
  };

  // This initially sets the creditCard
  const checkCC = async () => {
    if (loggedIn) {
      const [successful, res] = await getCards(userData._id);
      if (successful) {
        if (res.data.length === 0) {
          setCCFlag(false);
        } else {
        // Gets the first one, which should be the only one
          await updateCreditCard(['cardId', res.data[0].id], ['expMonth', res.data[0].card.exp_month], ['expYear', res.data[0].card.exp_year], ['last4', res.data[0].card.last4]);
          setCCFlag(true);
        }
      }
    }
  };

  useEffect(() => {
    checkCC();
  }, []);

  useEffect(() => {
  }, [finalCreditCard, creditCard]);

  // For a logged in user
  const postOrPutCardToUser = async () => {
    // This can be polished later to only run once and save the required id
    const [, response] = await getCards(userData._id);
    const savedUserCards = response.data;
    // POST command
    if (savedUserCards.length === 0) {
      // Call the newCardToUser command
      const [successful, res] = await newCardToUser(
        userData._id,
        creditCard.cardNumber,
        creditCard.expMonth,
        creditCard.expYear,
        creditCard.CVC,
      );
      if (successful) {
        await updateCreditCard(['cardId', res.id]);
        await updateCreditCard(['last4', res.card.last4]);
        await updateFinalCreditCard(
          ['cardNumber', creditCard.cardNumber],
          ['last4', res.card.last4],
          ['cardId', res.id],
          ['expMonth', res.card.exp_month],
          ['expYear', res.card.exp_year],
          ['CVC', creditCard.CVC],
          ['name', creditCard.name],
        );
        await updateBooking(['method_id', res.id]);
      } else {
        setError(true);
      }
      return successful;
    }
    // Call the PUT command to overwrite it
    const savedCardId = savedUserCards[0].id;
    const [successful, res] = await updateCardForUser(
      userData._id,
      savedCardId,
      creditCard.cardNumber,
      creditCard.expMonth,
      creditCard.expYear,
      creditCard.CVC,
    );
    if (successful) {
      // saves the new card id
      await updateCreditCard(['cardId', res.id]);
      await updateCreditCard(['last4', res.card.last4]);
      await updateFinalCreditCard(
        ['cardNumber', creditCard.cardNumber],
        ['last4', res.card.last4],
        ['cardId', res.id],
        ['expMonth', res.card.exp_month],
        ['expYear', res.card.exp_year],
        ['CVC', creditCard.CVC],
        ['name', creditCard.name],
      );
      await updateBooking(['method_id', res.id]);
    } else {
      setError(true);
    }
    return successful;
  };

  const getCardAndUpdate = async () => {
    const [success, response] = await getCards(userData._id);
    const savedUserCards = response.data;
    updateFinalCreditCard(
      ['last4', savedUserCards[0].card.last4],
      ['cardId', savedUserCards[0].id],
      ['expMonth', savedUserCards[0].card.exp_month],
      ['expYear', savedUserCards[0].card.exp_year],
      ['name', booking.name],
    );
    return success;
  };

  // This calls the post command to check if the card is valid, but does NOT save it to user
  const postCard = async () => {
    const [successful, res] = await newCardCheck(
      creditCard.cardNumber,
      creditCard.expMonth,
      creditCard.expYear,
      creditCard.CVC,
    );
    if (successful) {
      updateCreditCard(['cardId', res.id]);
      setFinalCreditCard(creditCard);
      await updateFinalCreditCard(
        ['cardNumber', creditCard.cardNumber],
        ['last4', res.card.last4],
        ['cardId', res.id],
        ['expMonth', res.card.exp_month],
        ['expYear', res.card.exp_year],
        ['CVC', creditCard.CVC],
        ['name', creditCard.name],
      );
      await updateBooking(['method_id', res.id]);
    } else {
      setError(true);
    }
    return successful;
  };

  const validateNext = async (setPayInStore = undefined) => {
    const trustedPayInStore = setPayInStore || booking.payInStore;
    switch (page) {
      case 0:
        if (booking.service) {
          setPage((prev) => prev + 1);
        } else {
          setError(true);
        }
        break;
      case 1:
        if (booking.name && booking.email && booking.phone_number) {
          setPage((prev) => prev + 1);
        } else {
          setError(true);
        }
        break;
      case 2:
        if (trustedPayInStore) {
          setPage((prev) => prev + 1);
          break;
        }
        if (creditCard.name && creditCard.expMonth && creditCard.expYear) {
          // This checks if the remember my Card is checked, and does the appropriate post command
          if (!CCFlag) {
            // This is so that new Payment goes to payment
            if (checked) {
              // Saves to user
              const success = await postOrPutCardToUser(); // Checks if the card is valid
              if (success) {
                setPage((prev) => prev + 1);
              } else {
                setError(true);
              }
            } else {
              const success = await postCard();
              if (success) {
                setPage((prev) => prev + 1);
              } else {
                setError(true);
              }
            }
            break;
            // IF they have a card in store
          } else if (!checked) {
            // This updates when you do regular payment - logged in and straight to confirm
            if (!changeClicked || !cancelPressed) {
              await getCardAndUpdate();
            }
          }
          setCCFlag(true);
          setPage((prev) => prev + 1);
        } else {
          setError(true);
        }
        break;
      case 3:
        setPage((prev) => prev + 1);
        break;
      default:
        break;
    }
  };

  // I changed this so that I could test NewPayment. new Payment and Calendar should be flipped
  const renderPage = () => {
    switch (page) {
      case 0:
        // if they are logged in,
        return (
          <Details
            booking={booking}
            updateBooking={(...argus) => updateBooking(...argus)}
            loading={loading}
            specialists={specialists}
            services={services}
            setNoPrice={setNoPrice}
          />
        );
      case 1:
        return (
          <Calendar
            booking={booking}
            updateBooking={(...argus) => updateBooking(...argus)}
            loading={loading}
          />
        );
      case 2:
        if (noPrice) {
          return (
            <ServiceUnavailable
              updateBooking={(...argus) => updateBooking(...argus)}
              nextPage={() => validateNext()}
              noPrice={noPrice}
              setPage={setPage}
            />
          );
        }
        if (CCFlag) {
          return (
            <ConfirmPayment
              updateCreditCard={(...argus) => updateCreditCard(...argus)}
              booking={booking}
              nextPage={() => validateNext()}
              updateBooking={(...argus) => updateBooking(...argus)}
              creditCard={creditCard}
              changeCard={changeCard}
              setChangeCard={setChangeCard}
              setChangeClicked={setChangeClicked}
              checked={checked}
              setChecked={setChecked}
              postOrPutCardToUser={postOrPutCardToUser}
              loggedIn={loggedIn}
              cardSelected={cardSelected}
              setCardSelected={setCardSelected}
              setCancelPressed={setCancelPressed}
            />
          );
        }
        return (
          <NewPayment
            updateCreditCard={(...argus) => updateCreditCard(...argus)}
            loading={loading}
            nextPage={(setPayInStore = undefined) => validateNext(setPayInStore)}
            booking={booking}
            updateBooking={(...argus) => updateBooking(...argus)}
            creditCard={creditCard}
            checked={checked}
            setChecked={setChecked}
            changeCard={changeCard}
            loggedIn={loggedIn}
            services={services}
          />
        );
      case 3:
        return (
          <ReviewBooking
            booking={booking}
            updateBooking={(...argu) => updateBooking(...argu)}
            specialists={specialists}
            services={services}
            loading={loading}
            sendRequest={(book) => sendRequest(book)}
            finalCreditCard={finalCreditCard}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Page maxWidth="sm">
      <div className={classes.page}>
        <div>
          {renderPage()}
          <div className={classes.toolbar} />
        </div>
        <div className={classes.footer}>
          <MobileStepper
            steps={4}
            variant="dots"
            className={classes.stepper}
            activeStep={page}
            nextButton={(
              <Button size="large" onClick={() => validateNext()} disabled={page === 3}>
                Next
                <KeyboardArrowRight />
              </Button>
          )}
            backButton={(
              <Button size="large" onClick={() => setPage((prev) => prev - 1)} disabled={page === 0}>
                <KeyboardArrowLeft />
                Back
              </Button>
          )}
          />
        </div>
      </div>
      <Snackbar
        open={error}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={() => setError(false)}
      >
        <Alert severity="error">Please complete required fields!</Alert>
      </Snackbar>
    </Page>
  );
};

Book.propTypes = {
  userData: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    _id: PropTypes.string,
    phone_number: PropTypes.string,
  }).isRequired,
  newCardToUser: PropTypes.func.isRequired,
  updateCardForUser: PropTypes.func.isRequired,
  getCards: PropTypes.func.isRequired,
  newCardCheck: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};


export default Book;
