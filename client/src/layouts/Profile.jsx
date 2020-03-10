/* eslint-disable camelcase */
import React from 'react';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import ProfileComponent from '../components/Profile';
import Page from '../components/Page';

const style = {
  Paper: { padding: 20, marginTop: 10, marginBottom: 10 },
  Paper2: { padding: 10, marginTop: 5, marginBottom: 5 },
};

const Profile = ({ userData }) => {
  const { name, email, phone_number } = userData;
  return (
    <Page>
      <div>
        <h1 style={{ textAlign: 'center' }}>
          Profile
        </h1>
      </div>
      <div style={style.Paper2} elevation={5}>
        <Grid
          container
          style={{
            paddingLeft: 200, paddingRight: 200, paddingTop: 10, alignItems: 'center',
          }}
        >
          <Grid item xs={12} md={6}>
            <ProfileComponent name={name} />
          </Grid>
          <Grid item xs={12} md={6}>
            <div
              className="Person Details"
              style={{ paddingLeft: 60 }}
            >
              <Typography variant="h6" gutterBottom>
                Email:
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
};

export default Profile;
