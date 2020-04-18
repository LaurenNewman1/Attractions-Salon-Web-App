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

const NewPayment = ({
  booking, updateBooking, updateCreditCard, loading, nextPage,
  creditCard, checked, setChecked, changeCard,
  loggedIn, services,
}) => {
  const classes = useStyles();
  useEffect(() => {
    if (creditCard.cardNumber.length === 4) {
      updateCreditCard(['last4', creditCard.cardNumber.substr(creditCard.cardNumber.length - 4)]);
    }
  }, [creditCard.cardNumber]);

  useEffect(() => {
    if (!changeCard) {
      const currentService = services.find((x) => x._id === booking.service);
      let counter = currentService.price;
      // if(counter === 0) -> then you need to do something for pay in store
      for (let i = 0; i < booking.addons.length; i += 1) {
        counter += booking.addons[i].price;
      }
      const amountBeforeTax = counter * 100;
      const tax = 0.07;
      const total = Number(amountBeforeTax + (amountBeforeTax * tax));
      updateBooking(['amount', total]);
    }
  }, []);

  const payInStore = async () => {
    await updateBooking(['payInStore', true]);
    nextPage(true);
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
            label="Card Number"
            inputProps={{ maxLength: 16 }}
            onChange={(event) => updateCreditCard(['cardNumber', event.target.value])}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            type="expMonth"
            label="Exp Month"
            helperText="MM"
            inputProps={{ maxLength: 2 }}
            onChange={(event) => updateCreditCard(['expMonth', event.target.value])}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            type="expYear"
            label="Exp Year"
            helperText="YYYY"
            inputProps={{ maxLength: 4 }}
            onChange={(event) => updateCreditCard(['expYear', event.target.value])}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            type="CVC"
            label="CVC"
            helperText="###"
            inputProps={{ maxLength: 3 }}
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
            <Grid item xs={12} className={classes.divider} style={{ marginTop: 20 }}>
              <Divider variant="middle" style={{ flexGrow: 1 }} />
              <Typography variant="h5">
                OR
              </Typography>
              <Divider variant="middle" style={{ flexGrow: 1 }} />
            </Grid>
            <Grid item xs={12} className={classes.button} style={{ marginTop: 20 }}>
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
  setChecked: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  changeCard: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  nextPage: PropTypes.func.isRequired,
  services: PropTypes.shape([{
    type: PropTypes.string,
    services: PropTypes.array,
  }]).isRequired,
};

export default NewPayment;
