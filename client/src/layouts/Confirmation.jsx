import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import { useHistory, useParams } from 'react-router-dom';
import Page from '../components/Page';
import useStyles from '../css/ConfirmationStyles';

const Confirmation = () => {
  const params = useParams();
  const classes = useStyles();
  const history = useHistory();
  return (
    <Page maxWidth="md">
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h4" className={classes.spacing}>Appointment requested!</Typography>
        <CheckCircle className={classes.icon} />
        <Typography className={classes.spacing}>
          Please check your Email for confirmation and details.
        </Typography>
        <Typography className={classes.spacing}>{`Order #${params.id}`}</Typography>
        <Button
          onClick={() => history.push('/book')}
          variant="contained"
          color="primary"
        >
          Make another Booking
        </Button>
      </div>
    </Page>
  );
};

export default Confirmation;
