import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import Page from '../components/Page';
import useStyles from '../css/ConfirmationStyles';

const Confirmation = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Page>
      <Grid container className={classes.page}>
        <Grid item className={classes.centerCol} xs={5}>

          <div className={classes.text}>
            <p style={{ fontSize: '38px' }}>Appointment requested!</p>
            <CheckCircle className={classes.icon} />
            <p>Please check your E-mail for confirmation and details.</p>
            <p>Order #: 123456789</p>
            <Button
              onClick={() => history.push('/book')}
              variant="contained"
              color="primary"
              size="small"
            >
              MAKE ANOTHER BOOKING
            </Button>
          </div>

        </Grid>
      </Grid>
    </Page>
  );
};

export default Confirmation;
