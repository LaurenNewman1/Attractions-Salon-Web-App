/* eslint-disable max-len */
import React, { useState } from 'react';
import {
  Button, TextField, Typography, Fab,
  Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment,
} from '@material-ui/core';
import {
  AddCircle, Schedule, Add,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import useStyles from '../css/EditServiceStyles';
import Alert, { TYPE_ERROR } from './Alert';

const NewUser = ({
  addUser, setAlert, onClickAdd, updateNewUser,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  // const [alert, setAlert] = useState({
  //   open: false,
  //   type: '',
  //   text: '',
  // });
  // const attemptRegister = async () => {
  //   const lowerType = type.toLowerCase();
  //   addAddon();
  //   if (!name.length || !type.length || !description.length) {
  //     setAlert({ open: true, type: TYPE_ERROR, text: 'Please complete required fields.' });
  //   } else if (lowerType !== 'hair' && lowerType !== 'nails' && lowerType !== 'wax') {
  //     setAlert({ open: true, type: TYPE_ERROR, text: 'Valid types are hair, nails, or wax.' });
  //   } else {
  //     handleClose();
  //     await addService(name, lowerType, subtype, price,
  //       time, description, banner, addons);
  //   }
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const addAddon = async () => {
    setOpen(false);
    onClickAdd();
  };

  //   const attemptRegister = async () => {
  //     const type = typeInput.toLowerCase();
  //     addAddon();
  //     if (!name.length || !type.length || !description.length) {
  //       setAlert({ open: true, type: TYPE_ERROR, text: 'Please complete required fields.' });
  //     } else if (type !== 'hair' && type !== 'nails' && type !== 'wax') {
  //       setAlert({ open: true, type: TYPE_ERROR, text: 'Valid types are hair, nails, or wax.' });
  //     } else {
  //       handleClose();
  //       await addService(name, type, subtype, price,
  //         time, description, banner, addons);
  //     }
  //   };

  return (
    <>
      {/* <IconButton className={classes.button} variant="outlined" color="primary" onClick={handleClickOpen}>
        <AddCircle />
      </IconButton> */}
      <Fab color="primary" aria-label="add" size="small" onClick={handleClickOpen}>
        <Add />
      </Fab>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Service</DialogTitle>
        <DialogContent>
          <form className={classes.textfield} autoComplete="off">
            <TextField onChange={(e) => updateNewUser(['name', e.target.value])} id="standard-basic" label="Name" />
            <TextField onChange={(e) => updateNewUser(['email', e.target.value])} id="standard-basic" label="Email" />
            <TextField onChange={(e) => updateNewUser(['phone_number', e.target.value])} id="standard-basic" label="Phone Number" />
            <TextField onChange={(e) => updateNewUser(['password', e.target.value])} id="standard-basic" label="Password" />
            <TextField onChange={(e) => updateNewUser(['role', Number(e.target.value)])} id="standard-basic" label="Role" />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => addAddon()} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
NewUser.propTypes = {
  addUser: PropTypes.func.isRequired,
  onClickAdd: PropTypes.func.isRequired,
  setAlert: PropTypes.bool.isRequired,
  updateNewUser: PropTypes.func.isRequired,
};
export default NewUser;