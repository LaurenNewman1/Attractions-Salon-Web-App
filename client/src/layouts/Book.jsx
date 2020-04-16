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
import ReviewBooking from './ReviewBooking';
import useBooking from '../stores/BookStore';

const Book = ({
  userData, newCardToUser, updateCardForUser, getCards, getCard, deleteCard, newCardCheck, loggedIn,
}) => {
  const params = useParams();
  const [page, setPage] = useState(0);
  const [error, setError] = useState(false);
  const [badRequest, setBadRequest] = useState(true);
  const [checked, setChecked] = useState(false);
  const [noCC, setNoCC] = useState(false);
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
  const [saveCard, setSaveCard] = useState(false);
  const [creditCards, setCreditCards] = useState([]);

  // const setChangeCard = (f) => {
  //   console.trace(`changing changecard to ${f}!`);
  //   _setChangeCard(f);
  // };

  const updateBooking = (...argus) => {
    const newFields = { ...booking };
    argus.forEach((argu) => {
      const [fieldName, val] = argu;
      newFields[fieldName] = val;
    });
    console.log(`Try: ${newFields.name} AND ${newFields.email} AND ${newFields.payInStore} AND ${newFields.phone_number}`);
    setBooking(newFields);
  };

  const updateCreditCard = async (...argus) => {
    const newFields = { ...creditCard };
    argus.forEach((argu) => {
      const [fieldName, val] = argu;
      newFields[fieldName] = val;
      console.log(newFields);
    });
    setCreditCard(newFields);
  };

  const updateFinalCreditCard = async (...argus) => {
    const newFields = { ...finalCreditCard };
    argus.forEach((argu) => {
      const [fieldName, val] = argu;
      newFields[fieldName] = val;
      console.log(newFields);
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
          setNoCC(false);
        } else {
        // Gets the first one, which should be the only one
          setCreditCards(res.data[0]);
          // creditCard.cardId = res.data[0].id;
          // creditCard.expMonth = res.data[0].exp_month;
          // creditCard.expYear = res.data[0].exp_year;
          // creditCard.last4 = res.data[0].last4;
          await updateCreditCard(['cardId', res.data[0].id], ['expMonth', res.data[0].card.exp_month], ['expYear', res.data[0].card.exp_year], ['last4', res.data[0].card.last4]);
          setCCFlag(true);
          setNoCC(true);
        }
        console.log('getCards WORKED', res);
      } else {
        console.log('BOOK PAGE BAD GET REQUEST', res);
      }
    } else {
      setNoCC(true);
    }
  };

  useEffect(() => {
    checkCC();
  }, []);

  // For a logged in user
  const postOrPutCardToUser = async () => {
    // This can be polished later to only run once and save the required id
    const [success, response] = await getCards(userData._id);
    const savedUserCards = response.data;
    // This is the first card ID, which should be the only ID
    if (success) {
      // setCreditCards(response.data);
      console.log('getCards CALL WORKED', response);
    } else {
      console.log('BOOK PAGE BAD GET REQUEST', response);
    }
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
        console.log('POST REQUEST 1 WORKED', res);
        setBadRequest(false);
        await updateCreditCard(['cardId', res.data[0].id]);
        await updateCreditCard(['last4', res.data[0].card.last4]);
        await updateFinalCreditCard(
          ['cardNumber', creditCard.cardNumber],
          ['last4', res.data[0].card.last4],
          ['cardId', res.data[0].id],
          ['expMonth', res.data[0].card.exp_month],
          ['expYear', res.data[0].card.exp_year],
          ['CVC', creditCard.CVC],
          ['name', creditCard.name],
        );
        // This is jsut reasserting the cardId and last4
        console.log('MY FINAL CARD POST', finalCreditCard);
      } else {
        console.log('BAD POST REQUEST', res);
        // Checks validity of card
        // This is temporary - talk to Lauren
        setError(true);
        setBadRequest(true);
      }
    } else {
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
        console.log('PUT REQUEST WORKED', res);
        // saves the new card id
        setBadRequest(false);
        await updateCreditCard(['cardId', res.id]);
        // console.log(creditCard.cardNumber.substr(creditCard.cardNumber.length - 4));
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
        console.log('MY FINAL CARD PUT', finalCreditCard);
      } else {
        console.log('BAD PUT REQUEST', res);
        // Checks validity of card
        // This is temporary - talk to Lauren
        setError(true);
        setBadRequest(true);
      }
    }
  };


  useEffect(() => {
    console.log('FINAL CREDIT CARD CHANGES: ', finalCreditCard);
  }, [finalCreditCard]);

  // This calls the post command to check if the card is valid, but does NOT save it to user
  const postCard = async () => {
    const [successful, res] = await newCardCheck(
      creditCard.cardNumber,
      creditCard.expMonth,
      creditCard.expYear,
      creditCard.CVC,
    );
    if (successful) {
      console.log('POST REQUEST 2 WORKED', res);
      setBadRequest(false);
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
      console.log('MY FINAL CARD  POST 2', finalCreditCard);
    } else {
      console.log('BAD POST 2 REQUEST', res);
      // This is temporary - talk to Lauren
      setError(true);
      setBadRequest(true);
    }
  };

  const validateNext = () => {
    switch (page) {
      case 0:
        if (booking.service.length) {
          setPage((prev) => prev + 1);
        } else {
          setError(true);
        }
        break;
      case 1:
        console.log('The CCFLag is: ', CCFlag);
        if (booking.name && booking.email && booking.phone_number) {
          setPage((prev) => prev + 1);
        } else {
          setError(true);
        }
        break;
      case 2:
        console.log('The card: ', creditCard);
        if (creditCard.name && creditCard.expMonth && creditCard.expYear) {
          // This checks if the remember my Card is checked, and does the appropriate post command
          if (!CCFlag) {
            // This is so that new Payment goes to payment
            setCCFlag(true);
            // Checks if the card is valid
            if (checked) {
              // Saves to user
              console.log('MY CARD 1', creditCard);
              console.log('MY FINAL CARD 1', finalCreditCard);
              postOrPutCardToUser();
            } else {
              postCard();
            }
            break;
            // IF they have a card in store
          } else if (saveCard) {
            setCCFlag(true);
            // console.log('SAVE CARD PRESSED');
            console.log('MY CARD 2', creditCard);
            console.log('MY FINAL CARD 2', finalCreditCard);
            postOrPutCardToUser();
          } else {
            setCCFlag(true);
            updateFinalCreditCard(
              ['last4', creditCard.last4],
              ['cardId', creditCard.cardId],
              ['expMonth', creditCard.expMonth],
              ['expYear', creditCard.expYear],
              ['name', creditCard.name],
            );
          }
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
        if (CCFlag) {
          return (
            <ConfirmPayment
              updateCreditCard={(...argus) => updateCreditCard(...argus)}
              booking={booking}
              loading={loading}
              nextPage={() => validateNext()}
              updateBooking={(...argus) => updateBooking(...argus)}
              creditCards={creditCards}
              getCard={getCard}
              userData={userData}
              deleteCard={deleteCard}
              creditCard={creditCard}
              setCreditCards={setCreditCards}
              changeCard={changeCard}
              setChangeCard={setChangeCard}
              checked={checked}
              setChecked={setChecked}
              saveCard={saveCard}
              setSaveCard={setSaveCard}
              postOrPutCardToUser={postOrPutCardToUser}
              error={error}
              badRequest={badRequest}
              finalCreditCard={finalCreditCard}
              noCC={noCC}
            />
          );
        }
        return (
          <NewPayment
            updateCreditCard={(...argus) => updateCreditCard(...argus)}
            loading={loading}
            nextPage={() => validateNext()}
            booking={booking}
            updateBooking={(...argus) => updateBooking(...argus)}
            newCardToUser={newCardToUser}
            getCards={getCards}
            getCard={getCard}
            userData={userData}
            deleteCard={deleteCard}
            creditCard={creditCard}
            checked={checked}
            setChecked={setChecked}
            changeCard={changeCard}
            setChangeCard={setChangeCard}
            saveCard={saveCard}
            setSaveCard={setSaveCard}
            postOrPutCardToUser={postOrPutCardToUser}
            loggedIn={loggedIn}
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
              <Button size="small" onClick={() => validateNext()} disabled={page === 3}>
                Next
                <KeyboardArrowRight />
              </Button>
          )}
            backButton={(
              <Button size="small" onClick={() => setPage((prev) => prev - 1)} disabled={page === 0}>
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
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
  }).isRequired,
  newCardToUser: PropTypes.func.isRequired,
  updateCardForUser: PropTypes.func.isRequired,
  getCards: PropTypes.func.isRequired,
  getCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  newCardCheck: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};


export default Book;
