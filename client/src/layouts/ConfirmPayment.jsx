import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Typography, Divider, Paper,
  DialogActions, DialogContent, DialogTitle, Dialog,
} from '@material-ui/core';
import useStyles from '../css/ConfirmPaymentStyles';
import creditCardCircles from '../images/masterCardCircles.png';
import Loading from '../components/Loading';
import NewPayment from './NewPayment';

const ConfirmPayment = ({
  booking, loading, updateBooking, nextPage, creditCards, userData, getCard, deleteCard, getCards,
  updateCreditCard, creditCard, setCreditCards, changeCard, setChangeCard, rememberCard,
  setRememberCard, checked, setChecked, saveCard, setSaveCard, postOrPutCardToUser, error,
  badRequest,
}) => {
  const classes = useStyles();
  // const theme = useTheme();
  // const [selected, setSelected] = useState(true);

  // console.log('Credit Card Array: ', creditCards);
  // console.log('Credit Card Array LENGTH: ', creditCards.length);
  console.log('Credit Card: ', creditCard);

  // const updateSelectedCard = (card) => {
  //   updateCreditCard(['name', userData.name], ['expMonth', card.exp_month], ['expYear', card.exp_year]);
  // };
  // const changeTheCard = () => {
  //   setChangeCard(true);
  // };

  // const deleteFirstCard = async () => {
  //   const [successful, res] = await deleteCard(
  //     creditCards[0].id,
  //   );
  //   if (successful) {
  //     console.log('DELETE REQUEST WORKED', res);
  //     setCreditCards(creditCards.filter((x) => x.id !== res.id));
  //     // updateCreditCard(['cardId', res.id]);
  //   } else {
  //     console.log('BAD DELETE REQUEST', res);
  //   }
  // };
  // console.log('NEW CREDIT CARDS ARRAY: ', creditCards);
  

  const payInStore = () => {
    updateBooking(['payInStore', !booking.payInStore]);
    nextPage();
  };

  const printOutInfo = () => {
    // console.log('Change Card: ', changeCard);
    // console.log('Remember Card: ', rememberCard);
    // console.log('Credit Card: ', creditCard);
  };

  useEffect(() => {
    if (!badRequest) {
      setChangeCard(false);
    }
  }, [badRequest]);
  const savePressed = async () => {
    setSaveCard(true);
    await postOrPutCardToUser();
    // This is so that the pop up closes
  };
  // I need to run through the credit cards object, which has the data array of all the credit cards
  // That this person uses, and then I need to output accordingly
  return (
    <div className={classes.page}>
      {loading ? <Loading /> : null}
      <h2 className={classes.header}>Confirm Payment Method</h2>
      {/* {(creditCards.length !== 0) ? (creditCards.map(({ card }) => (
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 18,
        }}
        >
          <Paper
            className={classes.paper}
            style={{ borderColor: selected ? theme.palette.primary.main : 'transparent' }}
            onClick={() => updateSelectedCard(card)}
          >
            <img src={creditCardCircles} alt="Circles" className={classes.circles} />
            <Typography variant="h5">
              ....&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              ....&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              ....&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {card.last4}
            </Typography>
            <div className={classes.middleSpace} />
            <div className={classes.spaceBetween}>
              <Typography variant="subtitle1">Name</Typography>
              <Typography variant="subtitle1">Exp</Typography>
            </div>
            <div className={classes.spaceBetween}>
              <Typography variant="subtitle2">{booking.name}</Typography>
              <Typography variant="subtitle2">{card.exp_month}/{card.exp_year}</Typography>
            </div>
          </Paper>
        </div>
      )))
        : (
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 18,
          }}
          >
            <Paper
              className={classes.paper}
              style={{ borderColor: selected ? theme.palette.primary.main : 'transparent' }}
            >
              <img src={creditCardCircles} alt="Circles" className={classes.circles} />
              <Typography variant="h5">
                ....&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                ....&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                ....&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {creditCard.cardNumber.substr(creditCard.cardNumber.length - 4)}
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
          </div>
        )} */}
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 18,
      }}
      >
        <Paper
          className={classes.paper}
        >
          <img src={creditCardCircles} alt="Circles" className={classes.circles} />
          <Typography variant="h5">
            ....&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            ....&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            ....&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {/* {creditCard.cardNumber.substr(creditCard.cardNumber.length - 4)} */}
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
      </div>
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
        {printOutInfo()}
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
              rememberCard={rememberCard}
              setRememberCard={setRememberCard}
              saveCard={saveCard}
              setSaveCard={setSaveCard}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setChangeCard(false)}>Cancel</Button>
            <Button onClick={() => savePressed()} color="primary" variant="contained" autoFocus>
              Save Card
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className={classes.divider}>
        <Divider variant="middle" style={{ flexGrow: 1 }} />
        <Typography variant="h5">
          OR
        </Typography>
        <Divider variant="middle" style={{ flexGrow: 1 }} />
      </div>
      <Button
        style={{ marginTop: 20 }}
        variant="contained"
        color="primary"
        onClick={() => payInStore()}
      >
        Pay In Store
      </Button>
      {/* <Button
        style={{ marginTop: 20 }}
        variant="contained"
        color="primary"
        onClick={() => deleteFirstCard()}
      >
        Delete First Card
      </Button> */}
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
  creditCards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    last4: PropTypes.string,
    card: PropTypes.shape({
      exp_month: PropTypes.string,
      exp_year: PropTypes.string,
    }).isRequired,
  })).isRequired,
  nextPage: PropTypes.func.isRequired,
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
    expMonth: PropTypes.string,
    expYear: PropTypes.string,
    CVC: PropTypes.string,
    zipCode: PropTypes.string,
  }).isRequired,
  updateCreditCard: PropTypes.func.isRequired,
  setCreditCards: PropTypes.func.isRequired,
  changeCard: PropTypes.bool.isRequired,
  setChangeCard: PropTypes.func.isRequired,
  rememberCard: PropTypes.bool.isRequired,
  setRememberCard: PropTypes.func.isRequired,
  saveCard: PropTypes.bool.isRequired,
  setSaveCard: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  setChecked: PropTypes.func.isRequired,
  postOrPutCardToUser: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  badRequest: PropTypes.bool.isRequired,

};

export default ConfirmPayment;
