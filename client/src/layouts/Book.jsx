import React, { useState } from 'react';
import {
  MobileStepper, Button, Container, Snackbar,
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
import ReviewBooking from './ReviewBooking';

const Book = ({ userData }) => {
  const [page, setPage] = useState(0);
  const [error, setError] = useState(false);
  const [booking, setBooking] = useState({
    name: userData ? userData.name : '',
    email: userData ? userData.email : '',
    phone_number: userData ? userData.phone_number : '',
    confirmed: false,
    time: '',
    service: '',
    addons: [],
    specialist: '',
    notes: '',
  });
  const classes = useStyles();

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
      console.log(newFields);
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
        if (booking.name.length && booking.email.length && booking.service.length) {
          setPage((prev) => prev + 1);
        } else {
          setError(true);
        }
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
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
            updateBooking={(...argu) => updateBooking(...argu)}
          />
        );
      case 1:
        return (
          <NewPayment
            updateCreditCard={(...argu) => updateCreditCard(...argu)}
          />
        );
      case 2:
        return <Calendar />;
      case 3:
        return <ReviewBooking />;
      default:
        return null;
    }
  };

  return (
    <Page>
      <Container maxWidth="sm">
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
      </Container>
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
