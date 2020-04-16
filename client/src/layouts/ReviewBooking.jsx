import moment from 'moment';
import {
  Card, CardMedia, Grid, CardActionArea,
  Button, Typography, Divider,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import hairIllustration from '../images/hairIllustration.png';
import eye from '../images/eye.png';
import hand from '../images/hand.png';
import useStyles from '../css/ReviewStyles';
import Loading from '../components/Loading';


const ReviewBooking = ({
  booking, specialists, services, loading, sendRequest, finalCreditCard, updateBooking,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const currentService = services.find((x) => x._id === booking.service);
  const [price, setPrice] = useState(0);
  const [tempBool, setTempBool] = useState(true);
  // const [amountInPennies, setAmountInPennies] = useState(0);
  // console.log(services);
  // console.log(booking.service);
  // console.log(booking.addons);

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
    const amountInPennies = (price * 100);
    console.log('AMOUNT IN PENNIES', amountInPennies);
    updateBooking(['amount', amountInPennies]);
    setTempBool(false);
  }, [tempBool]);

  useEffect(() => {
    updateBooking(['method_id', finalCreditCard.cardId]);
    console.log('FINAL CARD', finalCreditCard);
  }, []);

  // I need to ask alen about this
  console.log('The price is: ', price);
  const updateBookingRequest = async () => {
    const { specialist, ...restOfBooking } = booking;
    const requestBooking = !booking.specialist ? restOfBooking : booking;
    console.log('The requested BOOKING', requestBooking);
    const [success, res] = await sendRequest(requestBooking);
    if (success) {
      history.push(`/confirmation/${res._id}`);
      console.log('BOOKING WAS A SUCCESS', res);
    } else {
      console.log('FAILED booking request', res);
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
        <Typography variant="subtitle1">.... .... .... {finalCreditCard.last4}</Typography>
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
              <CardActionArea>
                <CardMedia component="image" image={hairIllustration} className={classes.media} />
                <h5 className={classes.cardContent}>Hair</h5>
              </CardActionArea>
              )
            }
            {
              currentService.type === 'wax'
              && (
              <CardActionArea>
                <CardMedia component="image" image={eye} className={classes.media} />
                <h5 className={classes.cardContent}>Wax</h5>
              </CardActionArea>
              )
            }
            {
              currentService.type === 'nails'
              && (
              <CardActionArea>
                <CardMedia component="image" image={hand} className={classes.media} />
                <h5 className={classes.cardContent}>Nails</h5>
              </CardActionArea>
              )
            }
          </Card>
        </Grid>
        <Grid item xs={6}>
          <div style={{ display: 'flex' }}>
            <Typography variant="subtitle1" color="textSecondary">Service:&nbsp;</Typography>
            <Typography variant="subtitle1">
              {currentService.type.split('').map((x, i) => (i === 0 ? x.toUpperCase() : x)).join('')}
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
          <Typography variant="subtitle1">{moment(booking.time).format('MMMM Do YYYY, h:mm a')}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="textSecondary">Notes: {booking.notes}</Typography>
        </Grid>
      </Grid>
      <Divider variant="middle" className={classes.divider} />
      <div style={{ marginTop: 10 }}>
        <div className={classes.spacing}>
          <Typography variant="subtitle1" color="textSecondary">Subtotal:</Typography>
          <Typography variant="subtitle1">${price}</Typography>
        </div>
        <div className={classes.spacing}>
          <Typography variant="subtitle1" color="textSecondary">Tax:</Typography>
          <Typography variant="subtitle1">$0 FOR NOW</Typography>
        </div>
        <div className={classes.spacing}>
          <Typography variant="h5" color="textSecondary">Total:</Typography>
          <Typography variant="h5">${price}</Typography>
        </div>
      </div>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateBookingRequest()}
        >
          Request Appointment
        </Button>
      </div>
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
