import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Container,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import useStyles from '../css/PageStyles';
import logo from '../images/logo.png';

const Page = ({ children }) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Container className={classes.background}>
      <AppBar position="static">
        <Toolbar>
          <Button onClick={() => history.push('/')} aria-label="logo">
            <img src={logo} alt="logo" style={{ width: '150px' }} />
          </Button>
          <div className={classes.grow} />
          <Button onClick={() => history.push('/book')}>Book</Button>
          <Button onClick={() => history.push('/services')}>Services</Button>
          <Button onClick={() => history.push('/contact')}>Contact</Button>
          <Button onClick={() => history.push('/login')}>Login</Button>
        </Toolbar>
      </AppBar>
      <div className={classes.body}>
        { children }
      </div>
    </Container>
  );
};

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Page;
