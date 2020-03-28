import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const Confirm = ({
  title, content, confirmText, onConfirm, onCancel,
}) => {
  const [open, setOpen] = useState(true);

  const cancel = () => {
    setOpen(false);
    onCancel();
  };

  const confirm = () => {
    setOpen(false);
    onConfirm();
  };

  return (
    <Dialog
      open={open}
      onClose={() => cancel()}
    >
      <DialogTitle>{title}</DialogTitle>
      {content
        ? (
          <DialogContent>
            <DialogContentText>{content}</DialogContentText>
          </DialogContent>
        )
        : null }
      <DialogActions>
        <Button onClick={() => cancel()}>Cancel</Button>
        <Button
          onClick={() => confirm()}
          variant="contained"
          color="primary"
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

Confirm.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  confirmText: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

Confirm.defaultProps = {
  content: null,
  confirmText: 'Confirm',
};

export default Confirm;
