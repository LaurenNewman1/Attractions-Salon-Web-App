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

const NavBar = ({ loggedIn }) => {
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

  return (
    <AppBar position="static">
      <Toolbar>
        <Button onClick={() => history.push('/')} aria-label="logo">
          <img src={logo} alt="logo" style={{ width: '150px' }} />
        </Button>
        <div className={classes.grow} />
        <Button onClick={() => handleBook()}>Book</Button>
        <Button onClick={() => history.push('/services')}>Services</Button>
        <Button onClick={() => history.push('/contact')}>Contact</Button>
        {userLogin}
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};


export default NavBar;
