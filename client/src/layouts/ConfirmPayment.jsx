import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Grid, Typography, Divider, Paper, Link,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import useStyles from '../css/ConfirmPayment';
import creditCardCircles from '../images/masterCardCircles.png';

const ConfirmPayment = ({ booking }) => {
  const classes = useStyles();
  const [payLater, setPayLater] = useState(false);

  // The link needs to be changed to something that works, rn it does not work. it needs to go to the new Credit Card Page
  // Maybe do something like book and change the page based off of some variable(state) being true

  return (
    <>
      <h1 className={classes.login}>Confirm Payment Method</h1>
      <div>
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={10} className={classes.page}>
            <Paper className={classes.paper}>
              <img src={creditCardCircles} alt="Circles" className={classes.circles} />
              <div className={classes.login}>
                <Typography variant="h4">
                  ....&nbsp;&nbsp;&nbsp;&nbsp;....&nbsp;&nbsp;&nbsp;&nbsp;....&nbsp;&nbsp;&nbsp;&nbsp;1234
                </Typography>
              </div>
              <div className={classes.middleSpace} />
              <div className={classes.spacing}>
                <Typography variant="h6">
                  Name
                </Typography>
                <div className={classes.middleSpace} />
                <Typography variant="h6">
                  Exp
                </Typography>
              </div>
              <div className={classes.spacing}>
                <Typography>
                  {booking.name}
                </Typography>
                <div className={classes.middleSpace} />
                <Typography>
                  01/01
                </Typography>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={1} />
        </Grid>
        <div className={classes.link}>
          <Button
            color="background"
            style={{ textDecoration: 'underline' }}
            target="_blank"
            // You need to actually link this - look at contact
          >
            Change Card
          </Button>
        </div>
        <br />
        <br />
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
            onClick={() => setPayLater(true)}
            // You need to figure this one out too
          >
            Pay In Store
          </Button>
        </div>
      </div>

    </>
  );
};

ConfirmPayment.propTypes = {
  booking: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone_number: PropTypes.string,
    confirmed: PropTypes.bool,
    time: PropTypes.string,
    service: PropTypes.string,
    addons: PropTypes.array,
    specialist: PropTypes.string,
    notes: PropTypes.string,
  }).isRequired,
  creditCard: PropTypes.shape({
    name: PropTypes.string,
    cardNumber: PropTypes.string,
    expMonth: PropTypes.string,
    expYear: PropTypes.string,
    CVV: PropTypes.string,
    zipCode: PropTypes.string,
  }).isRequired,

};

export default ConfirmPayment;
