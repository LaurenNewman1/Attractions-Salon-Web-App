import React from 'react';
import {
  Container,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import useStyles from '../css/PageStyles';

const Page = ({ maxWidth, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.background}>
      <Container
        maxWidth={maxWidth}
        disableGutters
        className={maxWidth ? classes.sidePadding : classes.topPagePadding}
      >
        { children }
      </Container>
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  maxWidth: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
};

Page.defaultProps = {
  maxWidth: 'lg',
};

export default Page;
