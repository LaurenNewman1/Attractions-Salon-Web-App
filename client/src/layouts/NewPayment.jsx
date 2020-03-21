import React, { useState } from 'react';
import {
  TextField, Button, Grid, FormControl,
  InputLabel, Select, MenuItem, FormControlLabel,
  Checkbox, Typography, Divider,
} from '@material-ui/core';
import useStyles from '../css/NewPaymentStyles';

const NewPayment = () => {
  const classes = useStyles();
  const [expirationDate, setExpirationDate] = useState('');
  const [CVV, setCVV] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };


  return (
    <>
      {/* <Grid container className={classes.page}> */}
      {/* <Grid item xs={12} sm={6} className={classes.imgContainer}>
          <img src={NewPaymentImg} alt="" className={classes.modelImg} />
        </Grid> */}
      <h1 className={classes.login}>Enter Payment Info</h1>
      <div>
        <TextField
          fullWidth
          type="Name"
          label="Name on Card"
          value={nameOnCard}
          onChange={(e) => setNameOnCard(e.target.value)}
        />
        <TextField
          fullWidth
          type="Card Number"
          label="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
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
                value={CVV}
                onChange={(e) => setCVV(e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
        <div className={classes.zipCode}>
          <TextField
            fullWidth
            type="Zip Code"
            label="Zip Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
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
          >
            Pay In Store
          </Button>
        </div>
      </div>

    </>
  );
};

export default NewPayment;
