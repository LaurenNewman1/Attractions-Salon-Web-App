import React from 'react';
import {
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';

export const TYPE_SUCCESS = 'success'; // green
export const TYPE_ERROR = 'error'; // red
export const TYPE_WARNING = 'warning'; // orange
export const TYPE_INFO = 'info'; // blue

const AlertBar = ({
  open, type, text, onClose,
}) => (
  <Snackbar
    open={open}
    autoHideDuration={2000}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    onClose={() => onClose()}
  >
    <Alert severity={type.length ? type : 'success'}>{text}</Alert>
  </Snackbar>
);

AlertBar.propTypes = {
  open: PropTypes.bool.isRequired,
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

AlertBar.defaultProps = {
  type: 'success',
};

export default AlertBar;
