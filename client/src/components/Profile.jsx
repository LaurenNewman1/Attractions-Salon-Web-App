import React from 'react';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PropTypes from 'prop-types';

const Profile = ({ name }) => (
  <>
    <div style={{ display: 'flex', justifyContent: 'center', paddingLeft: 50 }}>
      <AccountCircle
        style={{ fontSize: 120 }}
        color="background.dark"
      />
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', paddingLeft: 50 }}>
      <Typography variant="h6" gutterBottom>
        {name}
      </Typography>
    </div>
  </>
);

Profile.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Profile;
