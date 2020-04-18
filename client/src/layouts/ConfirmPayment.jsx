import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Typography, Divider, Paper,
  DialogActions, DialogContent, DialogTitle, Dialog, Grid, useTheme, ButtonBase,
} from '@material-ui/core';
import useStyles from '../css/ConfirmPaymentStyles';
import creditCardCircles from '../images/masterCardCircles.png';
import Loading from '../components/Loading';
import NewPayment from './NewPayment';

const ConfirmPayment = ({
  booking, loading, updateBooking, userData, getCard, deleteCard, getCards,
  updateCreditCard, creditCard, finalCreditCard, changeCard, setChangeCard, checked, setChecked,
  saveCard, setSaveCard, postOrPutCardToUser, loggedIn, cardSelected, setCardSelected, nextPage,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const goToNextPage = () => {
    setCardSelected(!cardSelected);
    nextPage();
  };

  const savePressed = async () => {
    setSaveCard(true);
    const success = await postOrPutCardToUser();
    if (success) {
      setChangeCard(false);
    }
  };

  const payInStore = async () => {
    updateBooking(['payInStore', true]);
    nextPage();
  };

  return (
    <div className={classes.page}>
      {loading ? <Loading /> : null}
      <h2 className={classes.header}>Confirm Payment Method</h2>
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 18,
      }}
      >
        <ButtonBase
          className={classes.btnBase}
          onClick={() => goToNextPage()}
        >
          <Paper
            style={{ borderColor: cardSelected ? theme.palette.primary.main : 'transparent' }}
            className={classes.paper}
          >
            <img src={creditCardCircles} alt="Circles" className={classes.circles} />
            <Typography variant="h5">
              ....&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              ....&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              ....&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {/* {!noCC ? creditCard.last4 : finalCreditCard.last4} */}
              {creditCard.last4}
            </Typography>
            <div className={classes.middleSpace} />
            <div className={classes.spaceBetween}>
              <Typography variant="subtitle1">Name</Typography>
              <Typography variant="subtitle1">Exp</Typography>
            </div>
            <div className={classes.spaceBetween}>
              <Typography variant="subtitle2">{creditCard.name}</Typography>
              <Typography variant="subtitle2">{creditCard.expMonth}/{creditCard.expYear}</Typography>
            </div>
          </Paper>
        </ButtonBase>
      </div>
      {loggedIn && (
        <>
          {console.log('B4 change Card', creditCard)}
          {console.log('B4 FINAL change Card', finalCreditCard)}
          <div className={classes.link}>
            <Button
              style={{ textDecoration: 'underline' }}
              target="_blank"
              onClick={() => setChangeCard(true)}
            >
              Change Card
            </Button>
          </div>
          <div>
            <Dialog
              open={changeCard}
              fullWidth
              maxWidth="md"
              onClose={() => setChangeCard(false)}
            >
              <DialogTitle>Change Credit Card</DialogTitle>
              <DialogContent>
                <NewPayment
                  updateCreditCard={(...argus) => updateCreditCard(...argus)}
                  loading={loading}
                  booking={booking}
                  updateBooking={(...argus) => updateBooking(...argus)}
                  getCards={getCards}
                  getCard={getCard}
                  userData={userData}
                  deleteCard={deleteCard}
                  creditCard={creditCard}
                  checked={checked}
                  setChecked={setChecked}
                  changeCard={changeCard}
                  setChangeCard={setChangeCard}
                  saveCard={saveCard}
                  setSaveCard={setSaveCard}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setChangeCard(false)}>Cancel</Button>
                {console.log('Credit card b4 SAVE: ', creditCard)}
                {console.log(' FINAL Credit card b4 SAVE: ', finalCreditCard)}
                <Button onClick={() => savePressed()} color="primary" variant="contained" autoFocus>
                  Save Card
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </>
      )}
      <div>
        <Grid item xs={12} className={classes.divider}>
          <Divider variant="middle" style={{ flexGrow: 1 }} />
          <Typography variant="h5">
            OR
          </Typography>
          <Divider variant="middle" style={{ flexGrow: 1 }} />
        </Grid>
        <Grid item xs={12} className={classes.button}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => payInStore()}
          >
            Pay In Store
          </Button>
        </Grid>
      </div>
    </div>
  );
};

ConfirmPayment.propTypes = {
  booking: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone_number: PropTypes.string,
    confirmed: PropTypes.bool,
    timeOrdered: PropTypes.string,
    time: PropTypes.string,
    service: PropTypes.string,
    addons: PropTypes.array,
    specialist: PropTypes.string,
    notes: PropTypes.string,
    payInStore: PropTypes.bool,
  }).isRequired,
  updateBooking: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  userData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
  }).isRequired,
  getCards: PropTypes.func.isRequired,
  getCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  creditCard: PropTypes.shape({
    name: PropTypes.string,
    last4: PropTypes.string,
    cardNumber: PropTypes.string,
    expMonth: PropTypes.number,
    expYear: PropTypes.number,
    CVC: PropTypes.number,
    zipCode: PropTypes.string,
  }).isRequired,
  updateCreditCard: PropTypes.func.isRequired,
  changeCard: PropTypes.bool.isRequired,
  setChangeCard: PropTypes.func.isRequired,
  saveCard: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  setSaveCard: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  setChecked: PropTypes.func.isRequired,
  cardSelected: PropTypes.bool.isRequired,
  setCardSelected: PropTypes.func.isRequired,
  postOrPutCardToUser: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  finalCreditCard: PropTypes.shape({
    last4: PropTypes.string,
  }).isRequired,
};

export default ConfirmPayment;
