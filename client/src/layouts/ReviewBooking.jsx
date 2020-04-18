import moment from 'moment';
import {
  Card, CardMedia, Grid,
  Button, Typography, Divider,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Recaptcha from 'react-google-recaptcha';
import hairIllustration from '../images/hairIllustration.png';
import eye from '../images/eye.png';
import hand from '../images/hand.png';
import useStyles from '../css/ReviewStyles';
import Loading from '../components/Loading';
import Alert, { TYPE_ERROR } from '../components/Alert';

const ReviewBooking = ({
  booking, specialists, services, loading, sendRequest, finalCreditCard, updateBooking,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const captchaRef = React.createRef();
  const currentService = services.find((x) => x._id === booking.service);
  const [price, setPrice] = useState(0);
  const [tempBool, setTempBool] = useState(true);
  const amountBeforeTax = price * 100;
  const tax = 0.07;
  const total = Number(amountBeforeTax + (amountBeforeTax * tax));
  const [alert, setAlert] = useState({
    open: false,
    type: '',
    text: '',
  });

  useEffect(() => {
    let counter = currentService.price;
    // if(counter === 0) -> then you need to do something for pay in store
    for (let i = 0; i < booking.addons.length; i += 1) {
      counter += booking.addons[i].price;
    }
    setPrice(counter);
    setTempBool(true);
  }, []);

  useEffect(() => {
    updateBooking(['amount', total]);
    setTempBool(false);
  }, [tempBool]);

  useEffect(() => {
    updateBooking(['method_id', finalCreditCard.cardId]);
  }, []);

  const updateBookingRequest = async () => {
    const { specialist, ...restOfBooking } = booking;
    const requestBooking = !booking.specialist ? restOfBooking : booking;
    const [success, res] = await sendRequest({ ...requestBooking, captchaResponse: captchaRef.current.getValue() });
    if (success) {
      history.push(`/confirmation/${res._id}`);
    } else {
      setAlert({
        open: true,
        type: TYPE_ERROR,
        text: 'Request failed to send. Please try again later.',
      });
    }
  };

  const renderUserData = () => (
    <div className={classes.information}>
      <div className={classes.spacing}>
        <Typography variant="subtitle1" color="textSecondary">Name:</Typography>
        <Typography variant="subtitle1">{booking.name}</Typography>
      </div>
      <div className={classes.spacing}>
        <Typography variant="subtitle1" color="textSecondary">Phone:</Typography>
        <Typography variant="subtitle1">{booking.phone_number}
        </Typography>
      </div>
      <div className={classes.spacing}>
        <Typography variant="subtitle1" color="textSecondary">Card:</Typography>
        <Typography variant="subtitle1">
          {booking.payInStore ? 'Pay In Store' : `**** **** **** ${finalCreditCard.last4}`}
        </Typography>
      </div>
    </div>
  );


  return (
    <>
      {loading ? <Loading /> : null}
      <h2 className={classes.header}>Review Booking</h2>
      {renderUserData()}
      <Divider variant="middle" className={classes.divider} />
      <Grid container spacing={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Grid item xs={4}>
          <Card className={classes.card}>
            {
              currentService.type === 'hair'
              && (
              <>
                <CardMedia component="image" image={hairIllustration} className={classes.media} />
                <h5 className={classes.cardContent}>Hair</h5>
              </>
              )
            }
            {
              currentService.type === 'wax'
              && (
              <>
                <CardMedia component="image" image={eye} className={classes.media} />
                <h5 className={classes.cardContent}>Wax</h5>
              </>
              )
            }
            {
              currentService.type === 'nails'
              && (
              <>
                <CardMedia component="image" image={hand} className={classes.media} />
                <h5 className={classes.cardContent}>Nails</h5>
              </>
              )
            }
          </Card>
        </Grid>
        <Grid item xs={6}>
          <div style={{ display: 'flex' }}>
            <Typography variant="subtitle1" color="textSecondary">Service:&nbsp;</Typography>
            <Typography variant="subtitle1">
              {currentService.name}
            </Typography>
          </div>
          <div style={{ display: 'flex' }}>
            <Typography variant="subtitle1" color="textSecondary">Specialist:&nbsp;</Typography>
            <Typography variant="subtitle1">
              { specialists && booking.specialist
                ? specialists.find((s) => s._id === booking.specialist).name
                : 'TBD' }
            </Typography>
          </div>
          <div style={{ display: 'flex' }}>
            <Typography variant="subtitle1" color="textSecondary">Date:&nbsp;</Typography>
            <Typography variant="subtitle1">{moment(booking.time).format('MMMM Do YYYY, h:mm a')}</Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="textSecondary">Notes: {booking.notes}</Typography>
        </Grid>
      </Grid>
      {price && (
        <>
          <Divider variant="middle" className={classes.divider} />
          <div style={{ marginTop: 10 }}>
            <div className={classes.spacing}>
              <Typography variant="subtitle1" color="textSecondary">Subtotal:</Typography>
              <Typography variant="subtitle1">${price || 'TBD'}</Typography>
            </div>
            <div className={classes.spacing}>
              <Typography variant="subtitle1" color="textSecondary">Tax:</Typography>
              <Typography variant="subtitle1">${(tax * price).toFixed(2)}</Typography>
            </div>
            <div className={classes.spacing}>
              <Typography variant="h5" color="textSecondary">Total:</Typography>
              <Typography variant="h5">${(total / 100).toFixed(2) || 'TBD'}</Typography>
            </div>
          </div>
        </>
      )}
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateBookingRequest()}
        >
          Request Appointment
        </Button>
      </div>
      <Alert
        open={alert.open}
        type={alert.type}
        text={alert.text}
        onClose={() => setAlert({ open: false, type: '', text: '' })}
      />
    </>
  );
};

ReviewBooking.propTypes = {
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
    payInStore: PropTypes.bool,
  }).isRequired,
  specialists: PropTypes.shape([{
    name: PropTypes.string,
    specialties: PropTypes.array,
  }]).isRequired,
  services: PropTypes.shape([{
    type: PropTypes.string,
    services: PropTypes.array,
  }]).isRequired,
  loading: PropTypes.bool.isRequired,
  sendRequest: PropTypes.func.isRequired,
  updateBooking: PropTypes.func.isRequired,
  finalCreditCard: PropTypes.shape({
    name: PropTypes.string,
    cardNumber: PropTypes.string,
    expMonth: PropTypes.string,
    expYear: PropTypes.string,
    CVC: PropTypes.string,
    cardId: PropTypes.string,
    last4: PropTypes.string,
  }).isRequired,
};
export default ReviewBooking;
