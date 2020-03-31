import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TextField, Button, Grid, FormControlLabel,
  Checkbox, Typography, Divider,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import useStyles from '../css/NewPaymentStyles';
import Loading from '../components/Loading';

// You need to do payLater and take a look at the update functions as well as expiration date

const NewPayment = ({
  booking, updateBooking, updateCreditCard, loading, nextPage,
}) => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);

  const rememberCard = (event) => {
    setChecked(event.target.checked);
  };

  const payInStore = () => {
    updateBooking(['payInStore', !booking.payInStore]);
    nextPage();
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {loading ? <Loading /> : null}
      <h2 className={classes.header}>Enter Payment Info</h2>
      <Grid container spacing={1} style={{ display: 'flex', alignItems: 'center' }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="Name"
            label="Name on Card"
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
          <KeyboardDatePicker
            fullWidth
            style={{ paddingBottom: 6 }}
            margin="normal"
            label="Date"
            format="MM/dd/yyyy"
            onChange={(date) => updateCreditCard(['exp', date])}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            type="CVV"
            label="CVV"
            onChange={(event) => updateCreditCard(['CVV', event.target.value])}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            type="Zip Code"
            label="Zip Code"
            onChange={(event) => updateCreditCard(['zipCode', event.target.value])}

          />
        </Grid>
        <Grid item xs={12} className={classes.center}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={checked}
                onChange={rememberCard}
                name="Remember this Card"
              />
)}
            label="Remember this Card"
          />
        </Grid>
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
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

NewPayment.propTypes = {
  creditCard: PropTypes.shape({
    name: PropTypes.string,
    cardNumber: PropTypes.string,
    exp: PropTypes.string,
    CVV: PropTypes.string,
    zipCode: PropTypes.string,
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
  nextPage: PropTypes.func.isRequired,
};

export default NewPayment;
