/* eslint-disable max-len */
import React, { useState } from 'react';
import {
  Button, TextField,
  Dialog, DialogActions, DialogContent, DialogTitle, IconButton,
} from '@material-ui/core';
import {
  AddCircle,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import Page from './Page';
import useStyles from '../css/EditServiceStyles';

const NewService = ({ addService }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [subtype, setSubType] = useState('');
  const [price, setPrice] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [errorBody, setErrorBody] = useState({});
  const [hasError, setHasError] = useState(false);
  const [banner, setBanner] = useState('');
  const [addonPrice, setAddonPrice] = useState('');
  const [addonName, setAddonName] = useState('');
  const [addons, setAddons] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const addAddon = () => {
    setAddons([
      ...addons,
      {
        name: addonName,
        price: addonPrice,
      },
    ]);
    return addons;
  };
  const attemptRegister = async () => {
    // eslint-disable-next-line max-len
    addAddon();
    const [successful, errors] = await addService(name, type, subtype, price, time, description, banner, addons);
    setErrorBody({});
    setHasError(!successful);
    if (successful) {
      console.log(addonName);
      console.log('new service added');
      // const response = await addService(name, type, subtype, price, time, description, banner, addons);
      console.log(addons);
    } else {
      setErrorBody(errors);
    }
    console.log(errorBody, hasError);
  };
  return (
    <>
      <IconButton className={classes.button} variant="outlined" color="primary" onClick={handleClickOpen}>
        <AddCircle />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Service</DialogTitle>
        <DialogContent>
          <form className={classes.textfield} autoComplete="off">
            <TextField onChange={(e) => setName(e.target.value)} id="standard-basic" label="Name" />
            <TextField onChange={(e) => setType(e.target.value)} id="standard-basic" label="Type" />
            <TextField onChange={(e) => setSubType(e.target.value)} id="standard-basic" label="subType" />
            <TextField onChange={(e) => setPrice(e.target.value)} id="standard-basic" label="Price" />
            <TextField onChange={(e) => setTime(e.target.value)} id="standard-basic" label="Time" />
            <TextField onChange={(e) => setBanner(e.target.value)} id="standard-basic" label="Banner" />
            <TextField onChange={(e) => setAddonName(e.target.value)} id="standard-basic" label="AddonName" />
            <TextField onChange={(e) => setAddonPrice(e.target.value)} id="standard-basic" label="AddonPrice" />
            <TextField
              onClick={addAddon}
              onChange={(e) => setDescription(e.target.value)}
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
          <Button onClick={() => attemptRegister()} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

NewService.propTypes = {
  addService: PropTypes.func.isRequired,
};

export default NewService;
