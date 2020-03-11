/* eslint-disable camelcase */
import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import Page from '../components/Page';
import useStyles from '../css/ProfileStyles';

const Profile = ({ userData, logout }) => {
  const { name, email, phone_number } = userData;
  const history = useHistory();
  const classes = useStyles();

  return (
    <Page>
      <div>
        <h1 className={classes.header}>Profile</h1>
      </div>
      <div>
        <Grid container spacing={8} className={classes.container}>
          <Grid item xs={12} md={6} className={classes.leftContainer}>
            <div>
              <AccountCircle style={{ fontSize: 120 }} />
              <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>{name}</Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div>
              <Typography variant="h6" gutterBottom>
                Email:
                {' '}
                {email}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Phone:
                {' '}
                {phone_number}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Card: .... .... .... 1234
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} className={classes.logout}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => { logout(); history.push('/'); }}
            >
              Log Out
            </Button>
          </Grid>
        </Grid>
      </div>
    </Page>
  );
};

Profile.propTypes = {
  userData: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone_number: PropTypes.number.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
};

export default Profile;
