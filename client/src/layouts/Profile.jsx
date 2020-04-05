/* eslint-disable camelcase */
import React, { useState } from 'react';
import {
  Grid, Button, TextField, IconButton, Icon, useTheme, useMediaQuery,
} from '@material-ui/core';
import { AccountCircle, Edit as EditIcon } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Page from '../components/Page';
import useStyles from '../css/ProfileStyles';

// eslint-disable-next-line object-curly-newline
const Profile = ({ userData, logout, changeProfile }) => {
  const { name, email, phone_number } = userData;
  const [textBoxValues, setTextBoxValues] = React.useState({});
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const [editMode, setEditMode] = useState(false);

  React.useEffect(() => {
    setTextBoxValues(userData);
  }, [userData]);


  const updateTextBoxValue = (key, val) => {
    setTextBoxValues({
      ...textBoxValues,
      [key]: val,
    });
  };

  const renderSavedPage = () => {
    setEditMode(false);
    changeProfile(userData._id, {
      email: textBoxValues.email,
      phone_number: textBoxValues.phone_number,
      name: textBoxValues.name,
    });
    // This is where you will be updating all the stuff on the backend
  };

  const renderEditablePage = () => {
    if (editMode) {
      return (
        <>
          <Grid item xs={12} md={6} className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12} md={6} className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => renderSavedPage()}
            >
              Save
            </Button>
          </Grid>
        </>
      );
    }
    return null;
  };

  const renderTextFields = () => {
    if (!editMode) {
      return (
        <div style={{ textAlign: isSmall ? 'center' : undefined }}>
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
      );
    }
    return (
      <div style={{ textAlign: isSmall ? 'center' : undefined }}>
        <TextField style={{ paddingBottom: 10 }} defaultValue={name} label="Name" value={textBoxValues.name} onChange={(e) => updateTextBoxValue('name', e.target.value)} />
        <br />
        <TextField style={{ paddingBottom: 10 }} defaultValue={email} label="Email" value={textBoxValues.email} onChange={(e) => updateTextBoxValue('email', e.target.value)} />
        <br />
        <TextField style={{ paddingBottom: 10 }} defaultValue={phone_number} label="Phone Number" value={textBoxValues.phone_number} onChange={(e) => updateTextBoxValue('phone_number', e.target.value)} />
        <br />
        <TextField defaultValue=".... .... .... 1234" label="Credit Card" />
      </div>
    );
  };

  return (
    <Page>
      <div style={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <h1 className={classes.header}>Profile</h1>
        {!editMode && (
        <IconButton onClick={() => setEditMode(true)}>
          <Icon>
            <EditIcon />
          </Icon>
        </IconButton>
        )}
      </div>
      <div>
        <Grid container spacing={8} className={classes.container}>
          <Grid item xs={12} md={6} className={isSmall ? classes.leftContainerSmall : classes.leftContainer}>
            <div>
              <AccountCircle style={{ fontSize: 120 }} />
              <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>{name}</Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            {renderTextFields()}
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
          <Grid item xs={12} md={6} className={classes.logout}>
            {renderEditablePage()}
          </Grid>
        </Grid>
      </div>
    </Page>
  );
};

Profile.propTypes = {
  userData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone_number: PropTypes.number.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
  changeProfile: PropTypes.func.isRequired,
};

export default Profile;
