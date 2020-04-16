import React, { useEffect } from 'react';
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
  saveCard, setSaveCard, loggedIn,
}) => {
  const classes = useStyles();
  useEffect(() => {
    if (creditCard.cardNumber.length === 4) {
      updateCreditCard(['last4', creditCard.cardNumber.substr(creditCard.cardNumber.length - 4)]);
    }
  }, [creditCard.cardNumber]);

  // console.log('USER DATA: ', userData);
  // console.log('CREDIT CARD: ', creditCard);

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
    updateBooking(['payInStore', !booking.payInStore]);
    nextPage();
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
            // value={booking.name}
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
          <TextField
            fullWidth
            type="expMonth"
            label="Exp Month"
            helperText="MM"
            onChange={(event) => updateCreditCard(['expMonth', event.target.value])}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
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
        {!changeCard && loggedIn && (
        <Grid item xs={12} className={classes.center}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
                name="Remember this Card"
              />
                  )}
            label="Remember this Card"
          />
        </Grid>
        )}{!changeCard && (
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
                Pay In Store
              </Button>
            </Grid>
          </>
        )}
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
    last4: PropTypes.string,
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
  saveCard: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  setSaveCard: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
};

export default NewPayment;
