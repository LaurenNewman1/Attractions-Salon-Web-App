/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import {
  Grid, Button, Input, IconButton,
} from '@material-ui/core';
import { AccountCircle, Edit as EditIcon, Delete } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Page from '../components/Page';
import useStyles from '../css/ProfileStyles';
import Alert, { TYPE_SUCCESS, TYPE_ERROR } from '../components/Alert';

// eslint-disable-next-line object-curly-newline
const Profile = ({ userData, logout, changeProfile, getCards, deleteCard }) => {
  const { name, email, phone_number } = userData;
  const [textBoxValues, setTextBoxValues] = useState({});
  const history = useHistory();
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);
  const [cardId, setCardId] = useState('');
  const [last4, setLast4] = useState('');
  const [alert, setAlert] = useState({
    open: false,
    type: '',
    text: '',
  });

  const checkCC = async () => {
    if (userData._id) {
      const [success, response] = await getCards(userData._id);
      const savedUserCards = response.data;
      if (success) {
        if (savedUserCards.length > 0) {
          setCardId(savedUserCards[0].id);
          setLast4(savedUserCards[0].card.last4);
        }
      }
    }
  };

  useEffect(() => {
    checkCC();
  }, []);

  useEffect(() => {
    setTextBoxValues(userData);
  }, [userData]);

  const updateTextBoxValue = (key, val) => {
    setTextBoxValues({
      ...textBoxValues,
      [key]: val,
    });
  };

  const renderSavedPage = async () => {
    setEditMode(false);
    const [success] = await changeProfile(userData._id, {
      email: textBoxValues.email,
      phone_number: textBoxValues.phone_number,
      name: textBoxValues.name,
    });
    setAlert({
      open: true,
      type: success ? TYPE_SUCCESS : TYPE_ERROR,
      text: success ? 'Profile saved successfully.' : 'Failed to save profile.',
    });
    checkCC();
  };

  const renderEditablePage = () => {
    if (editMode) {
      return (
        <>
          <Button
            onClick={() => setEditMode(false)}
            style={{ marginRight: 10 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => renderSavedPage()}
          >
            Save
          </Button>
        </>
      );
    }
    return null;
  };

  const deleteMyCard = async () => {
    const [success] = await deleteCard(cardId);
    setAlert({
      open: true,
      type: success ? TYPE_SUCCESS : TYPE_ERROR,
      text: success ? 'Card deleted successfully.' : 'Failed to delete card.',
    });
    if (success) {
      setLast4('');
    }
  };

  const renderTextFields = () => {
    if (!editMode) {
      return (
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
            Credit Card:
            {' '}
            **** **** **** {last4}
          </Typography>
        </div>
      );
    }
    return (
      <div>
        <Typography variant="h6" gutterBottom style={{ display: 'flex', alignItems: 'center' }}>
          Email:
          {' '}
          <Input
            style={{ paddingLeft: 5 }}
            defaultValue={email}
            value={textBoxValues.email}
            onChange={(e) => updateTextBoxValue('email', e.target.value)}
          />
        </Typography>
        <Typography variant="h6" gutterBottom style={{ display: 'flex', alignItems: 'center' }}>
          Phone Number:
          {' '}
          <Input
            style={{ paddingLeft: 5 }}
            defaultValue={phone_number}
            value={textBoxValues.phone_number}
            onChange={(e) => updateTextBoxValue('phone_number', e.target.value)}
          />
        </Typography>
        <Typography variant="h6" gutterBottom style={{ display: 'flex', alignItems: 'center' }}>
          Credit Card:
          {' '}
          **** **** **** {last4}
          <IconButton onClick={() => deleteMyCard()}><Delete /></IconButton>
        </Typography>
      </div>
    );
  };

  return (
    <Page maxWidth="sm">
      <div style={{ paddingTop: 5 }}>
        <h1
          className={classes.header}
          align="center"
          display="block"
          gutterBottom
        >
          <div style={{ width: 40 }} />
          Profile
          {editMode ? <div style={{ width: 40 }} />
            : (
              <IconButton onClick={() => setEditMode(true)}>
                <EditIcon size="small" />
              </IconButton>
            )}
        </h1>
      </div>
      <Grid container className={classes.align}>
        <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
          <AccountCircle style={{ fontSize: 120 }} />
          <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>{name}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.justify}>
          <div>
            {renderTextFields()}
          </div>
        </Grid>
        <Grid item xs={12} className={classes.justify} style={{ marginTop: 20 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => { logout(); history.push('/'); }}
          >
            Log Out
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {renderEditablePage()}
        </Grid>
      </Grid>
      <Alert
        open={alert.open}
        type={alert.type}
        text={alert.text}
        onClose={() => setAlert({ open: false, type: '', text: '' })}
      />
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
  getCards: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

export default Profile;
