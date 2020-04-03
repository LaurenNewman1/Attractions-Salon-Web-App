import React, { useState } from 'react';
import {
  AppBar, Toolbar, Button, IconButton, useMediaQuery, SwipeableDrawer,
  ListItem, List, ListItemText,
} from '@material-ui/core';
import { AccountCircle, Menu } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import useStyles from '../css/PageStyles';
import logo from '../images/logo.png';

const userOptions = [
  { name: 'Home', route: '/' },
  { name: 'Book', route: '/book' },
  { name: 'Services', route: '/services' },
  { name: 'Contact', route: '/contact' },
];

const adminOptions = [
  { name: 'Dashboard', route: '/admin/dashboard' },
  { name: 'Requests', route: '/admin/requests' },
  { name: 'Users', route: '/admin/users' },
  { name: 'Services', route: '/admin/services' },
  { name: 'Reviews', route: '/admin/reviews' },
];

const NavBar = ({ loggedIn, userData, setFromBookPage }) => {
  const history = useHistory();
  const classes = useStyles();
  const options = useState(userData && userData.role === 2 ? adminOptions : userOptions);
  const [open, setOpen] = useState(false);
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const routeToLogin = () => {
    setFromBookPage(false);
    history.push('/login');
  };

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
    : <Button onClick={() => routeToLogin()}>Login</Button>;

  const handleBook = () => {
    setOpen(false);
    if (loggedIn) {
      history.push('/book');
    } else {
      setFromBookPage(true);
      history.push('/login');
    }
  };

  const routeFromDrawer = (route) => {
    setOpen(false);
    history.push(route);
  };

  const renderBar = () => (
    <>
      {options[0].map((opt, index) => {
        if (index === 0) {
          return (
            <>
              <Button onClick={() => history.push(opt.route)} aria-label="logo">
                <img src={logo} alt="logo" style={{ width: '150px' }} />
              </Button>
              <div className={classes.grow} />
            </>
          );
        } if (opt.name === 'Book') {
          return (
            <Button onClick={() => handleBook()}>{opt.name}</Button>
          );
        }
        return <Button onClick={() => history.push(opt.route)}>{opt.name}</Button>;
      })}
      {userLogin}
    </>
  );

  const renderDrawer = () => (
    <>
      <IconButton color="inherit" onClick={() => setOpen((prev) => !prev)}>
        <Menu />
      </IconButton>
      <div className={classes.grow} />
      {userLogin}
      <SwipeableDrawer
        className={classes.drawer}
        anchor="left"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        classes={{
          paper: classes.drawer,
        }}
      >
        <List>
          {options[0].map((opt) => (
            <ListItem
              button
              key={opt.name}
              onClick={() => (opt.name === 'Book' ? handleBook() : routeFromDrawer(opt.route))}
            >
              <ListItemText primary={opt.name} />
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
    </>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        {matches ? renderBar() : renderDrawer()}
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
  setFromBookPage: PropTypes.func.isRequired,
};

NavBar.defaultProps = {
  userData: null,
};


export default NavBar;
