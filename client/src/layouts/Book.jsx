import React, { useState } from 'react';
import {
  MobileStepper, Button, Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {
  KeyboardArrowLeft, KeyboardArrowRight,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import Page from '../components/Page';
import useStyles from '../css/BookStyles';
import Details from './Details';
import Calendar from './Calendar';
import NewPayment from './NewPayment';
import ConfirmPayment from './ConfirmPayment';
import ReviewBooking from './ReviewBooking';
import useBooking from '../stores/BookStore';

const Book = ({ userData }) => {
  const [page, setPage] = useState(0);
  const [error, setError] = useState(false);
  const [booking, setBooking] = useState({
    name: userData ? userData.name : '',
    email: userData ? userData.email : '',
    phone_number: userData ? userData.phone_number : '',
    confirmed: false,
    timeOrdered: new Date(Date.now()).toISOString(),
    time: new Date(Date.now()).toISOString(),
    service: '',
    addons: [],
    specialist: '',
    notes: '',
    payInStore: false,
  });
  const classes = useStyles();
  const [loading, specialists, services] = useBooking();
  const [creditCard, setCreditCard] = useState({
    name: userData ? userData.name : '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    CVV: '',
    zipCode: '',
  });

  const updateBooking = (...argus) => {
    const newFields = { ...booking };
    argus.forEach((argu) => {
      const [fieldName, val] = argu;
      newFields[fieldName] = val;
    });
    setBooking(newFields);
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
        if (booking.name && booking.email) {
          setPage((prev) => prev + 1);
        } else {
          setError(true);
        }
        break;
      case 2:
        setPage((prev) => prev + 1);
        break;
      case 3:
        setPage((prev) => prev + 1);
        break;
        // case 4 is Temporary
      case 4:
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
          />
        );
      case 3:
        return (
          <ConfirmPayment
            booking={booking}
            nextPage={() => validateNext()}
            updateBooking={(...argus) => updateBooking(...argus)}
          />
        );
      case 4:
        return (
          <ReviewBooking
            booking={booking}
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
    phone_number: PropTypes.string.isRequired,
  }).isRequired,
};


export default Book;
