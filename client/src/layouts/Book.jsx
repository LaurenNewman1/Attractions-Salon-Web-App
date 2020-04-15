import React, { useState } from 'react';
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
  userData, newCardToUser, getCards, getCard, deleteCard, newCard,
}) => {
  const params = useParams();
  const [page, setPage] = useState(0);
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState(false);
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
  });
  const [CCFlag, setCCFlag] = useState(false);
  const [creditCards, setCreditCards] = useState([]);

  const updateBooking = (...argus) => {
    const newFields = { ...booking };
    argus.forEach((argu) => {
      const [fieldName, val] = argu;
      newFields[fieldName] = val;
    });
    console.log(`Try: ${newFields.name} AND ${newFields.email} AND ${newFields.payInStore} AND ${newFields.phone_number}`);
    setBooking(newFields);
  };

  const checkCC = async () => {
    const [successful, res] = await getCards(userData._id);
    if (successful) {
      if (res.data.length === 0) {
        setCCFlag(false);
      } else {
        setCreditCards(res.data);
        setCCFlag(true);
      }
      console.log('getCards WORKED', res);
    } else {
      console.log('BOOK PAGE BAD GET REQUEST', res);
    }
  };


  const updateCreditCard = (...argus) => {
    const newFields = { ...creditCard };
    argus.forEach((argu) => {
      const [fieldName, val] = argu;
      newFields[fieldName] = val;
      console.log(newFields);
    });
    setCreditCard(newFields);
  };

  const postCardToUser = async () => {
    const [successful, res] = await newCardToUser(
      userData._id,
      creditCard.cardNumber,
      creditCard.expMonth,
      creditCard.expYear,
      creditCard.CVC,
    );
    const [success, response] = await getCards(userData._id);
    if (success) {
      setCreditCards(response.data);
      console.log('getCards CALL WORKED', res);
    } else {
      console.log('BOOK PAGE BAD GET REQUEST', res);
    }

    if (successful) {
      console.log('POST REQUEST 1 WORKED', res);
      updateCreditCard(['cardId', res.id]);
    } else {
      console.log('BAD POST REQUEST', res);
      // Checks validity of card
      // This is temporary - talk to Lauren
      setError(true);
    }
  };

  const postCard = async () => {
    const [successful, res] = await newCard(
      creditCard.cardNumber,
      creditCard.expMonth,
      creditCard.expYear,
      creditCard.CVC,
    );
    if (successful) {
      console.log('POST REQUEST 2 WORKED', res);
      updateCreditCard(['cardId', res.id]);
    } else {
      console.log('BAD POST REQUEST', res);
      // This is temporary - talk to Lauren
      setError(true);
    }
  };

  const validateNext = () => {
    checkCC();
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
          if (CCFlag) {
            setPage((prev) => prev + 2);
          } else {
            setPage((prev) => prev + 1);
          }
        } else {
          setError(true);
        }
        break;
      case 2:
        if (creditCard.name && creditCard.expMonth && creditCard.expYear && creditCard.CVC) {
          // This checks if the remember my Card is checked, and does the appropriate post command
          if (checked) {
            // Saves to user
            postCardToUser();
          } else {
            // Just checks if card is valid
            postCard();
          }
          setPage((prev) => prev + 1);
        } else {
          setError(true);
        }
        break;
      case 3:
        setPage((prev) => prev + 1);
        break;
        // case 4 is Temporary
      case 4:
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
          />
        );
      case 3:
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
          />
        );
      case 4:
        return (
          <ReviewBooking
            booking={booking}
            updateBooking={(...argu) => updateBooking(...argu)}
            specialists={specialists}
            services={services}
            loading={loading}
            sendRequest={(book) => sendRequest(book)}
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
            steps={5}
            variant="dots"
            className={classes.stepper}
            activeStep={page}
            nextButton={(
              <Button size="small" onClick={() => validateNext()} disabled={page === 4}>
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
  getCards: PropTypes.func.isRequired,
  getCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  newCard: PropTypes.func.isRequired,
};


export default Book;
