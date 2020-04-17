import React from 'react';
import { Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Page from '../components/Page';
import useStyles from '../css/ServiceUnavailableStyles';

const ServiceUnavailable = ({ updateBooking, setPage }) => {
  const classes = useStyles();

  const payInStore = async () => {
    await updateBooking(['payInStore', true]);
    setPage((prev) => prev + 1);
  };

  return (
    <Page maxWidth="md">
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h4" className={classes.title}>We Apologize!</Typography>
        <Typography className={classes.spacing}>
          This salon service is unavailable for online purchase
        </Typography>
        <Button
          onClick={() => payInStore()}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          <Typography variant="button">Pay In Store</Typography>
        </Button>
      </div>
    </Page>
  );
};

ServiceUnavailable.propTypes = {
  updateBooking: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};


export default ServiceUnavailable;
