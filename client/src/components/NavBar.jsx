import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import useStyles from '../css/PageStyles';
import logo from '../images/logo.png';

const NavBar = ({ loggedIn, userData }) => {
  const history = useHistory();
  const classes = useStyles();

  const userLogin = loggedIn
    ? (
      <IconButton
        aria-label="Profile"
        onClick={() => history.push('/profile')}
        color="inherit"
      >
        <AccountCircle style={{ fontSize: 'xx-large' }} />
      </IconButton>
    )
    : <Button onClick={() => history.push('/login')}>Login</Button>;

  const handleBook = () => {
    if (loggedIn) {
      history.push('/book');
    } else {
      history.push('/login');
    }
  };

  const userButtons = (
    <>
      <Button onClick={() => history.push('/')} aria-label="logo">
        <img src={logo} alt="logo" style={{ width: '150px' }} />
      </Button>
      <div className={classes.grow} />
      <Button onClick={() => handleBook()}>Book</Button>
      <Button onClick={() => history.push('/services')}>Services</Button>
      <Button onClick={() => history.push('/contact')}>Contact</Button>
      {userLogin}
    </>
  );

  const adminButtons = (
    <>
      <Button onClick={() => history.push('/dashboard')}>Dashboard</Button>
      <div className={classes.grow} />
      <Button onClick={() => history.push('/requests')}>Requests</Button>
      <Button onClick={() => history.push('/users')}>Users</Button>
      <Button onClick={() => history.push('/adminServices')}>Services</Button>
      <Button onClick={() => history.push('/adminReviews')}>Reviews</Button>
      {userLogin}
    </>
  );
  console.log(userData.role);
  return (
    <AppBar position="static">
      <Toolbar>
        {userData && userData.role === 2 ? adminButtons : userButtons}
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  userData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
};

NavBar.defaultProps = {
  userData: null,
};


export default NavBar;
