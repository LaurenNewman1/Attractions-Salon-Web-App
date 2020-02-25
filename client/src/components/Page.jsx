import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
  useTheme,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/Page.css';

const Page = ({ children }) => {
  const theme = useTheme();
  const history = useHistory();

  return (
    <Container className="background" style={{ backgroundColor: theme.palette.background.main }}>
      <AppBar position="static">
        <Toolbar>
          <Button onClick={() => history.push('/')}><Typography className="logo">Attractions Salon</Typography></Button>
          <div className="grow" />
          <Button onClick={() => history.push('/book')}>Book</Button>
          <Button onClick={() => history.push('/services')}>Services</Button>
          <Button onClick={() => history.push('/contact')}>Contact</Button>
          <Button onClick={() => history.push('/login')}>Login</Button>
        </Toolbar>
      </AppBar>
      <div className="body">
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
