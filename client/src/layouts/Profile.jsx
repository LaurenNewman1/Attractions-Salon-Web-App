/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
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
const Profile = ({ userData, logout, changeProfile, getCards, deleteCard }) => {
  const { name, email, phone_number } = userData;
  const [textBoxValues, setTextBoxValues] = React.useState({});
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const [editMode, setEditMode] = useState(false);
  const [cardId, setCardId] = useState('');
  const [showCreditCard, setShowCreditCard] = useState(false);
  const [last4, setLast4] = useState('');


  const checkCC = async () => {
    if (userData._id) {
      const [success, response] = await getCards(userData._id);
      const savedUserCards = response.data;
      if (success) {
        console.log('getCards CALL WORKED', response);
        if (savedUserCards.length === 0) {
          setShowCreditCard(false);
        } else {
          setShowCreditCard(true);
          setCardId(savedUserCards[0].id);
          setLast4(savedUserCards[0].card.last4);
        }
      } else {
        console.log('BOOK PAGE BAD GET REQUEST', response);
      }
    }
  };

  useEffect(() => {
    checkCC();
  }, []);

  useEffect(() => {
    setTextBoxValues(userData);
  }, [userData]);

  // useEffect(() => {
  //   console.log('The credit Card var: ', showCreditCard);
  // }, [showCreditCard]);

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
    checkCC();
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

  const deleteMyCard = async () => {
    console.log('Card ID before DELETE', cardId);
    const [success, response] = await deleteCard(cardId);
    if (success) {
      console.log('Delete Card Works!', response);
    } else {
      console.log('Delete Card FAILED', response);
    }
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
          {console.log('CREDIT CARD: ', showCreditCard)}
          {showCreditCard ? (
            <>
              <Typography variant="h6" gutterBottom>
                You have a credit card ending in {last4} assigned to your account.
                <br />
                Would you like to delete it?
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => deleteMyCard()}
              >
                Delete Card
              </Button>
            </>
          ) : null}
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
  getCards: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

export default Profile;
