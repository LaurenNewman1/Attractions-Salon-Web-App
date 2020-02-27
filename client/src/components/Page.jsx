import React from 'react';
import {
  Container,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import useStyles from '../css/PageStyles';

const Page = ({ children }) => {
  const classes = useStyles();

  return (
    <Container className={classes.background}>
      { children }
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
