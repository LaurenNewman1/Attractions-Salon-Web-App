import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TextField, Button, Grid, FormControlLabel,
  Checkbox, Typography, Divider,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import useStyles from '../css/NewPaymentStyles';
import Loading from '../components/Loading';

// You need to do payLater and take a look at the update functions as well as expiration date

const NewPayment = ({
  booking, updateBooking, updateCreditCard, loading, nextPage, userData,
  creditCard, getCards, getCard, checked, setChecked, changeCard, setChangeCard,
  rememberCard, setRememberCard, saveCard, setSaveCard,
}) => {
  const classes = useStyles();

  // console.log('USER DATA: ', userData);
  // console.log('CREDIT CARD: ', creditCard);

  const checkBoxClicked = (event) => {
    console.log(changeCard);
    if (changeCard) {
      setRememberCard(event.target.checked);
    } else {
      setChecked(event.target.checked);
    }
  };

  // const rememberCard = async (event) => {
  //   // POST command for remebering the card
  //   setChecked(event.target.checked);
  //   // if (event.target.checked === true) {
  //   //   const [successful, res] = await newCardToUser(
  //   //     userData._id,
  //   //     creditCard.cardNumber,
  //   //     creditCard.expMonth,
  //   //     creditCard.expYear,
  //   //     creditCard.CVC,
  //   //   );
  //   //   if (successful) {
  //   //     console.log('POST REQUEST WORKED', res);
  //   //     updateCreditCard(['cardId', res.id]);
  //   //   } else {
  //   //     console.log('BAD POST REQUEST', res);
  //   //   }
  //   // } else {
  //   //   // Deletes the current card from being saved
  //   //   const [successful, res] = await deleteCard(
  //   //     creditCard.cardId,
  //   //   );
  //   //   if (successful) {
  //   //     console.log('DELETE REQUEST WORKED', res);
  //   //   } else {
  //   //     console.log('BAD DELETE REQUEST', res);
  //   //   }
  //   // }
  // };


  const payInStore = async () => {
    // const [successful, res] = await getCards(
    //   userData._id,
    // );
    // // console.log('The ID of the first credit card: ', res.data[0].id);
    // if (successful) {
    //   console.log('getCards WORKED', res);
    // } else {
    //   console.log('BADDDDDDDD2222222', res);
    // }
    updateBooking(['payInStore', !booking.payInStore]);
    nextPage();
  };

  // This is for getting a card and needs to be fixed
  const getCardRequest = async () => {
    // This returns the array of cards
    const [successful, res] = await getCards(
      userData._id,
    );
    // console.log('The ID of the first credit card: ', res.data[0].id);

    if (successful) {
      console.log('GET REQUEST WORKED', res);
    } else {
      console.log('GET REQUEST FAILED', res);
    }

    // const myCard = res.data[0];
    // // This is the individual card
    // const [success, response] = await getCard(
    //   myCard.id,
    // );
    // if (success) {
    //   console.log('DHRUVVVVYYYYY11111111111', response);
    //   setHasError(!success);
    // } else {
    //   console.log('BADDDDDDDD33333333333', response);
    //   setErrorBody(response);
    // }
  };

  const printOutInfo = () => {
    // console.log('Change Card: ', changeCard);
    // console.log('Checked: ', checked);
    // console.log('Remember Card: ', rememberCard);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {loading ? <Loading /> : null}
      {!changeCard && (
        <h2 className={classes.header}>Enter Payment Info</h2>
      )}
      <Grid container spacing={1} style={{ display: 'flex', alignItems: 'center' }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="Name"
            label="Name on Card"
            value={booking.name}
            onChange={(event) => updateCreditCard(['name', event.target.value])}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="Card Number"
            label="Card Number"
            onChange={(event) => updateCreditCard(['cardNumber', event.target.value])}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          {/* <KeyboardDatePicker
            fullWidth
            style={{ paddingBottom: 6 }}
            margin="normal"
            label="Date"
            format="MM/dd/yyyy"
            onChange={(date) => updateCreditCard(['exp', date])}
          /> */}
          <TextField
            fullWidth
            type="expMonth"
            label="Exp Month"
            helperText="MM"
            onChange={(event) => updateCreditCard(['expMonth', event.target.value])}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          {/* <KeyboardDatePicker
            fullWidth
            style={{ paddingBottom: 6 }}
            margin="normal"
            label="Date"
            format="MM/dd/yyyy"
            onChange={(date) => updateCreditCard(['exp', date])}
          /> */}
          <TextField
            fullWidth
            type="expYear"
            label="Exp Year"
            helperText="YYYY"
            onChange={(event) => updateCreditCard(['expYear', event.target.value])}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            type="CVC"
            label="CVC"
            helperText="###"
            onChange={(event) => updateCreditCard(['CVC', event.target.value])}
          />
        </Grid>
        {/* <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            type="Zip Code"
            label="Zip Code"
            onChange={(event) => updateCreditCard(['zipCode', event.target.value])}

          />
        </Grid> */}
        <Grid item xs={12} className={classes.center}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={changeCard ? rememberCard : checked}
                onChange={(event) => checkBoxClicked(event)}
                name="Remember this Card"
              />
)}
            label="Remember this Card"
          />
        </Grid>
        {printOutInfo()}
        {!changeCard && (
          <>
            <Grid item xs={12} className={classes.divider}>
              <Divider variant="middle" style={{ flexGrow: 1 }} />
              <Typography variant="h5">
                OR
              </Typography>
              <Divider variant="middle" style={{ flexGrow: 1 }} />
            </Grid>
            <Grid xs={12} className={classes.button}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => payInStore()}
              >
                Pay In Store // Testing getCards
              </Button>
            </Grid>
          </>
        )}
        {/* <Grid xs={12} className={classes.button}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => getCardRequest()}
          >
            Get Card TESTER
          </Button>
        </Grid> */}
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

NewPayment.propTypes = {
  creditCard: PropTypes.shape({
    name: PropTypes.string,
    cardNumber: PropTypes.string,
    expMonth: PropTypes.number,
    expYear: PropTypes.number,
    CVC: PropTypes.number,
    cardId: PropTypes.string,
  }).isRequired,
  updateCreditCard: PropTypes.func.isRequired,
  updateBooking: PropTypes.func.isRequired,
  booking: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone_number: PropTypes.string,
    confirmed: PropTypes.bool,
    timeOrdered: PropTypes.string,
    time: PropTypes.string,
    service: PropTypes.string,
    addons: PropTypes.array,
    specialist: PropTypes.string,
    notes: PropTypes.string,
    payInStore: PropTypes.bool,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  userData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
  }).isRequired,
  getCards: PropTypes.func.isRequired,
  getCard: PropTypes.func.isRequired,
  setChecked: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  changeCard: PropTypes.bool.isRequired,
  setChangeCard: PropTypes.func.isRequired,
  rememberCard: PropTypes.bool.isRequired,
  setRememberCard: PropTypes.func.isRequired,
  saveCard: PropTypes.bool.isRequired,
  setSaveCard: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
};

export default NewPayment;
