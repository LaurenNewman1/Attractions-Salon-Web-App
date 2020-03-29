import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TextField, Button, Grid, FormControl,
  InputLabel, Select, MenuItem, FormControlLabel,
  Checkbox, Typography, Divider,
} from '@material-ui/core';
import useStyles from '../css/NewPaymentStyles';

// You need to do payLater and take a look at the update functions as well as expiration date

const NewPayment = ({ updateCreditCard, updateBooking }) => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const updatePayInStore = (booleanValue) => {
    updateBooking(['payInStore', booleanValue]);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };


  return (
    <>
      <h1 className={classes.login}>Enter Payment Info</h1>
      <div>
        <TextField
          fullWidth
          type="Name"
          label="Name on Card"
          onChange={(event) => updateCreditCard(['name', event.target.value])}
        />
        <TextField
          fullWidth
          type="Card Number"
          label="Card Number"
          onChange={(event) => updateCreditCard(['cardNumber', event.target.value])}

        />
        <Grid container spacing={3}>
          <Grid container spacing={1}>
            <FormControl className={classes.textfield}>
              <InputLabel>MM</InputLabel>
              <Select>
                <MenuItem value="January">01</MenuItem>
                <MenuItem value="February">02</MenuItem>
                <MenuItem value="March">03</MenuItem>
                <MenuItem value="April">04</MenuItem>
                <MenuItem value="May">05</MenuItem>
                <MenuItem value="June">06</MenuItem>
                <MenuItem value="July">07</MenuItem>
                <MenuItem value="August">08</MenuItem>
                <MenuItem value="September">09</MenuItem>
                <MenuItem value="October">10</MenuItem>
                <MenuItem value="November">11</MenuItem>
                <MenuItem value="December">12</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.textfield2}>
              <InputLabel>YY</InputLabel>
              <Select>
                <MenuItem value="2020">20</MenuItem>
                <MenuItem value="2021">21</MenuItem>
                <MenuItem value="2022">22</MenuItem>
                <MenuItem value="2023">23</MenuItem>
                <MenuItem value="2024">24</MenuItem>
                <MenuItem value="2025">25</MenuItem>
                <MenuItem value="2025">26</MenuItem>
              </Select>
            </FormControl>
            <Grid item xs={6} className={classes.CVV}>
              <TextField
                fullWidth
                type="CVV"
                label="CVV"
                onChange={(event) => updateCreditCard(['CVV', event.target.value])}

              />
            </Grid>
          </Grid>
        </Grid>
        <div className={classes.zipCode}>
          <TextField
            fullWidth
            type="Zip Code"
            label="Zip Code"
            onChange={(event) => updateCreditCard(['zipCode', event.target.value])}

          />
        </div>
        <div className={classes.checkBox}>
          <FormControlLabel
            control={(
              <Checkbox
                checked={checked}
                onChange={handleChange}
                name="Remember this Card"
              />
)}
            label="Remember this Card"
          />
        </div>
        <div className={classes.divider}>
          <Divider variant="middle" style={{ flexGrow: 1 }} />
          <Typography variant="h5">
            OR
          </Typography>
          <Divider variant="middle" style={{ flexGrow: 1 }} />
        </div>
        <div className={classes.checkBox}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => updatePayInStore(true)}
          >
            Pay In Store
          </Button>
        </div>
      </div>

    </>
  );
};

NewPayment.propTypes = {
  creditCard: PropTypes.shape({
    name: PropTypes.string,
    cardNumber: PropTypes.string,
    expMonth: PropTypes.string,
    expYear: PropTypes.string,
    CVV: PropTypes.string,
    zipCode: PropTypes.string,
  }).isRequired,
  updateCreditCard: PropTypes.func.isRequired,
  updateBooking: PropTypes.func.isRequired,
};

export default NewPayment;
