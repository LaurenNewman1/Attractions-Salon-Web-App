import React, { useState, useEffect } from 'react';
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
  { name: 'About', route: '/about' },
  { name: 'Contact', route: '/contact' },
];

const adminOptions = [
  { name: 'Dashboard', route: '/admin/dashboard' },
  { name: 'Requests', route: '/admin/requests' },
  { name: 'Users', route: '/admin/users' },
  { name: 'Services', route: '/admin/services' },
  { name: 'Reviews', route: '/admin/reviews' },
];

const staffOptions = [
  { name: 'Dashboard', route: '/staff/dashboard' },
];

const NavBar = ({ loggedIn, userData, setFromBookPage }) => {
  const history = useHistory();
  const classes = useStyles();
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  useEffect(() => {
    switch (userData.role) {
      case 0:
        setOptions(userOptions);
        break;
      case 2:
        setOptions(adminOptions);
        break;
      case 1:
        setOptions(staffOptions);
        break;
      default:
        setOptions([]);
        break;
    }
  }, [userData]);

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

  const attractionsLogo = (opt) => (
    <>
      <Button onClick={() => history.push(opt.route)} aria-label="logo">
        <img src={logo} alt="logo" style={{ width: '150px' }} />
      </Button>
      <div className={classes.grow} />
    </>
  );

  const renderBar = () => (
    <>
      {options.map((opt, index) => {
        if (index === 0) {
          return attractionsLogo(opt);
        } if (opt.name === 'Book') {
          return (
            <Button key={opt.name} onClick={() => handleBook()}>{opt.name}</Button>
          );
        }
        return <Button key={opt.name} onClick={() => history.push(opt.route)}>{opt.name}</Button>;
      })}
      {options.length === 0 ? attractionsLogo({ route: '/' }) : null}
      {options.length === 0 ? null : userLogin}
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
          {options.map((opt) => (
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
