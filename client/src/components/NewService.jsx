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

const NewService = ({
  addService, setAlert, onClickAdd, updateNewService,
}) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [typeInput, setType] = useState('');
  const [subtype, setSubType] = useState('');
  const [price, setPrice] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  // const [errorBody, setErrorBody] = useState({});
  // const [hasError, setHasError] = useState(false);
  const [banner, setBanner] = useState('');
  const [addonPrice, setAddonPrice] = useState('');
  const [addonName, setAddonName] = useState('');
  const [addons, setAddons] = useState([]);
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
    updateNewService(['addons', [
      {
        name: addonName,
        price: addonPrice,
      },
    ]]);
    onClickAdd();
    return addons;
  };

  const attemptRegister = async () => {
    const type = typeInput.toLowerCase();
    addAddon();
    if (!name.length || !type.length || !description.length) {
      setAlert({ open: true, type: TYPE_ERROR, text: 'Please complete required fields.' });
    } else if (type !== 'hair' && type !== 'nails' && type !== 'wax') {
      setAlert({ open: true, type: TYPE_ERROR, text: 'Valid types are hair, nails, or wax.' });
    } else {
      handleClose();
      await addService(name, type, subtype, price,
        time, description, banner, addons);
    }
  };
  // const attemptRegister = async () => {
  //   // eslint-disable-next-line max-len
  //   addAddon();
  //   const [successful, errors] = await addService(name, type, subtype, price, time, description, banner, addons);
  //   setErrorBody({});
  //   setHasError(!successful);
  //   if (successful) {
  //     console.log(addonName);
  //     console.log('new service added');
  //     // const response = await addService(name, type, subtype, price, time, description, banner, addons);
  //     console.log(addons);
  //   } else {
  //     setErrorBody(errors);
  //   }
  //   console.log(errorBody, hasError);
  // };
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
            <TextField onChange={(e) => updateNewService(['name', e.target.value])} id="standard-basic" label="Name" />
            <TextField onChange={(e) => updateNewService(['type', e.target.value])} id="standard-basic" label="Type" />
            <TextField onChange={(e) => updateNewService(['subtype', e.target.value])} id="standard-basic" label="subType" />
            <TextField onChange={(e) => updateNewService(['price', e.target.value])} id="standard-basic" label="Price" />
            <TextField
              label="Time"
              className={classes.add}
              onChange={(e) => updateNewService(['time', e.target.value])}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Schedule />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography>mins</Typography>
                  </InputAdornment>
                ),
              }}
            />
            <TextField onChange={(e) => updateNewService(['banner', e.target.value])} id="standard-basic" label="Banner" />
            <TextField onChange={(e) => setAddonName(e.target.value)} id="standard-basic" label="AddonName" />
            <TextField onChange={(e) => setAddonPrice(e.target.value)} id="standard-basic" label="AddonPrice" />
            <TextField
              onClick={addAddon}
              onChange={(e) => updateNewService(['description', e.target.value])}
              id="outlined-multiline-static"
              multiline
              style={{ width: '88%' }}
              label="Description"
            />
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

NewService.propTypes = {
  addService: PropTypes.func.isRequired,
  onClickAdd: PropTypes.func.isRequired,
  setAlert: PropTypes.bool.isRequired,
  updateNewService: PropTypes.func.isRequired,
};

export default NewService;
