import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from '../css/ReviewStyles';


const ReviewBooking = () => {
  const classes = useStyles();
  const history = useHistory();
  const id = 0;

  return (
    <>
      <div className={classes.login}>
        <h1>Review Booking</h1>
      </div>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(`/confirmation/${id}`)}
        >
          Request Appointment
        </Button>
      </div>
    </>
  );
};

export default ReviewBooking;
