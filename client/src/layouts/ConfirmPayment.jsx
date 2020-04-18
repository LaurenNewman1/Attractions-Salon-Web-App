import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Typography, Divider, Card, CardActionArea, CardContent,
  DialogActions, DialogContent, DialogTitle, Dialog, Grid,
} from '@material-ui/core';
import useStyles from '../css/ConfirmPaymentStyles';
import creditCardCircles from '../images/masterCardCircles.png';
import Loading from '../components/Loading';
import NewPayment from './NewPayment';

const ConfirmPayment = ({
  booking, loading, updateBooking, deleteCard, updateCreditCard, creditCard,
  changeCard, setChangeCard, checked, setChecked, postOrPutCardToUser, loggedIn,
  cardSelected, setCardSelected, nextPage, setChangeClicked, setCancelPressed,
}) => {
  const classes = useStyles();

  const goToNextPage = () => {
    setCardSelected(!cardSelected);
    nextPage();
  };

  const savePressed = async () => {
    const success = await postOrPutCardToUser();
    if (success) {
      setChangeCard(false);
      setChangeClicked(true);
    }
  };

  const payInStore = async () => {
    updateBooking(['payInStore', true]);
    nextPage();
  };

  const cancelGotPressed = () => {
    setChangeCard(false);
    setCancelPressed(true);
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
        <Card
          className={classes.paper}
        >
          <CardActionArea
            onClick={() => { updateBooking(['payInStore', false]); goToNextPage(); }}
            style={{ width: '100%', height: '100%' }}
          >
            <CardContent>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={creditCardCircles} alt="" className={classes.circles} />
                <Typography variant="h5">
                  ****&nbsp;&nbsp;&nbsp;
                  ****&nbsp;&nbsp;&nbsp;
                  ****&nbsp;&nbsp;&nbsp;
                  {creditCard.last4}
                </Typography>
              </div>
              <div className={classes.middleSpace} />
              <div className={classes.spaceBetween}>
                <Typography variant="subtitle1">Name</Typography>
                <Typography variant="subtitle1">Exp</Typography>
              </div>
              <div className={classes.spaceBetween}>
                <Typography variant="subtitle2">{creditCard.name}</Typography>
                <Typography variant="subtitle2">{creditCard.expMonth}/{creditCard.expYear}</Typography>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
      {loggedIn && (
        <>
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
                  deleteCard={deleteCard}
                  creditCard={creditCard}
                  checked={checked}
                  setChecked={setChecked}
                  changeCard={changeCard}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => cancelGotPressed()}>Cancel</Button>
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
  loggedIn: PropTypes.bool.isRequired,
  checked: PropTypes.bool.isRequired,
  setChecked: PropTypes.func.isRequired,
  cardSelected: PropTypes.bool.isRequired,
  setCardSelected: PropTypes.func.isRequired,
  postOrPutCardToUser: PropTypes.func.isRequired,
  setChangeClicked: PropTypes.func.isRequired,
  setCancelPressed: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
};

export default ConfirmPayment;
