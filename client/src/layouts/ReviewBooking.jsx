import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const ReviewBooking = () => {
  const history = useHistory();
  const id = 0;

  return (
    <>
      <div>ReviewBooking</div>
      <Button variant="contained" onClick={() => history.push(`/confirmation/${id}`)}>Request Appointment</Button>
    </>
  );
};

export default ReviewBooking;
