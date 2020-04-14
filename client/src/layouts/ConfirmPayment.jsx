import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Typography, Divider, Paper,
} from '@material-ui/core';
import useStyles from '../css/ConfirmPaymentStyles';
import creditCardCircles from '../images/masterCardCircles.png';
import Loading from '../components/Loading';

const ConfirmPayment = ({
  booking, loading, updateBooking, nextPage, creditCards
}) => {
  const classes = useStyles();

  const payInStore = () => {
    updateBooking(['payInStore', !booking.payInStore]);
    nextPage();
  };

  // I need to run through the credit cards object, which has the data array of all the credit cards
  // That this person uses, and then I need to output accordingly
  return (
    <div className={classes.page}>
      {loading ? <Loading /> : null}
      <h2 className={classes.header}>Confirm Payment Method</h2>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Paper className={classes.paper}>
          <img src={creditCardCircles} alt="Circles" className={classes.circles} />
          <Typography variant="h5">
            ....&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            ....&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            ....&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            1234
          </Typography>
          <div className={classes.middleSpace} />
          <div className={classes.spaceBetween}>
            <Typography variant="subtitle1">Name</Typography>
            <Typography variant="subtitle1">Exp</Typography>
          </div>
          <div className={classes.spaceBetween}>
            <Typography variant="subtitle2">{booking.name}</Typography>
            <Typography variant="subtitle2">01/01</Typography>
          </div>
        </Paper>
      </div>
      <div className={classes.link}>
        <Button
          style={{ textDecoration: 'underline' }}
          target="_blank"
        >
          Change Card
        </Button>
      </div>
      <div className={classes.divider}>
        <Divider variant="middle" style={{ flexGrow: 1 }} />
        <Typography variant="h5">
          OR
        </Typography>
        <Divider variant="middle" style={{ flexGrow: 1 }} />
      </div>
      <Button
        style={{ marginTop: 20 }}
        variant="contained"
        color="primary"
        onClick={() => payInStore()}
      >
        Pay In Store
      </Button>
    </div>
  );
};

ConfirmPayment.propTypes = {
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
  updateBooking: PropTypes.func.isRequired,
  creditCards: PropTypes.shape({
    data: PropTypes.array,
  }).isRequired,
  nextPage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ConfirmPayment;
