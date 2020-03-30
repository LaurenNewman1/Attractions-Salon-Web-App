import React, { useState } from 'react';
import {
  Card, CardMedia, Grid, CardActionArea,
  Button, IconButton, Icon, Typography, Divider, useTheme,
} from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import hairIllustration from '../images/hairIllustration.png';
import eye from '../images/eye.png';
import hand from '../images/hand.png';
import useBooking from '../stores/BookStore';
import useStyles from '../css/ReviewStyles';


const ReviewBooking = ({ booking, specialists, services }) => {
  const [, , , sendRequest] = useBooking();
  const classes = useStyles();
  const [type, setType] = useState('');
  const theme = useTheme();
  const history = useHistory();
  const [editMode, setEditMode] = useState(false);

  const changeType = (newType) => {
    setType(newType);
  };

  const updateBookingRequest = async () => {
    const { specialist, ...restOfBooking } = booking;
    const requestBooking = !booking.specialist ? restOfBooking : booking;
    const [success, res] = await sendRequest(requestBooking);
    if (success) {
      history.push(`/confirmation/${res._id}`);
    }
  };

  const renderTextFields = () => {
    if (!editMode) {
      return (
        <div className={classes.information}>
          <div className={classes.spacing}>
            <Typography variant="h6" gutterBottom>
              Name:
            </Typography>
            <div className={classes.middleSpace} />
            <Typography variant="h6" gutterBottom>
              {booking.name}
            </Typography>
          </div>
          <div className={classes.spacing}>
            <Typography variant="h6" gutterBottom>
              Phone:
            </Typography>
            <div className={classes.middleSpace} />
            <Typography variant="h6" gutterBottom>
              {booking.phone_number}
            </Typography>
          </div>
          <div className={classes.spacing}>
            <Typography variant="h6" gutterBottom>
              Card:
            </Typography>
            <div className={classes.middleSpace} />
            <Typography variant="h6" gutterBottom>
              .... .... .... 1234
            </Typography>
          </div>
        </div>
      );
    }
    return null;
    // return (
    //   <div>
    //     <TextField style={{ paddingBottom: 10 }} defaultValue={booking.name} label="Name" value={textBoxValues.name} onChange={(e) => updateTextBoxValue('name', e.target.value)} />
    //     <br />
    //     <TextField style={{ paddingBottom: 10 }} defaultValue={booking.phone_number} label="Phone Number" value={textBoxValues.phone_number} onChange={(e) => updateTextBoxValue('phone_number', e.target.value)} />
    //     <br />
    //     <TextField defaultValue=".... .... .... 1234" label="Credit Card" />
    //   </div>
    // );
  };

  const currentService = services.find((x) => x._id === booking.service);

  return (
    <>
      <div style={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <h1>Review Booking</h1>
        {!editMode && (
          <IconButton onClick={() => setEditMode(true)}>
            <Icon>
              <EditIcon />
            </Icon>
          </IconButton>
        )}
      </div>
      {renderTextFields()}
      <div>
        <Divider variant="middle" style={{ flexGrow: 1 }} />
      </div>
      <div>
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={4}>
            <Card
              className={classes.card}
              style={{ borderColor: type === 'hair' ? theme.palette.primary.main : 'transparent' }}
            >
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
          <Grid item xs={8}>
            <div className={classes.spacing}>
              <Typography variant="h6" gutterBottom>
                Service:&nbsp;
              </Typography>
              <Typography variant="h6" gutterBottom>
                {currentService.type.split('').map((x, i) => (i === 0 ? x.toUpperCase() : x)).join('')}
              </Typography>
            </div>
            <div className={classes.spacing}>
              <Typography variant="h6" gutterBottom>
                Specialist:&nbsp;
              </Typography>
              <Typography variant="h6" gutterBottom>
                {
                  specialists && booking.specialist
                    ? specialists.find((s) => s._id === booking.specialist).name
                    : 'No specialist'
                  // IDK whats wrong
                }
                {/* {booking.specialist} */}
              </Typography>
            </div>
            <div className={classes.spacing}>
              <Typography variant="h6" gutterBottom>
                {new Date(booking.time).toLocaleString()}
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={4}>
            <Typography variant="h6" gutterBottom>
              Notes
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" gutterBottom>
              Notes
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" gutterBottom>
              Notes
            </Typography>
          </Grid>
        </Grid>
      </div>
      <div>
        <Divider variant="middle" style={{ flexGrow: 1 }} />
      </div>
      <div style={{ marginTop: 10 }}>
        <div className={classes.spacing}>
          <Typography variant="h6" gutterBottom>
            Subtotal:
          </Typography>
          <div className={classes.middleSpace} />
          <Typography variant="h6" gutterBottom>
            $$$
          </Typography>
        </div>
        <div className={classes.spacing}>
          <Typography variant="h6" gutterBottom>
            Tax:
          </Typography>
          <div className={classes.middleSpace} />
          <Typography variant="h6" gutterBottom>
            $$$
          </Typography>
        </div>
        <div className={classes.spacing}>
          <Typography variant="h5" gutterBottom>
            Total:
          </Typography>
          <div className={classes.middleSpace} />
          <Typography variant="h5" gutterBottom>
            $$$
          </Typography>
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
};
export default ReviewBooking;
