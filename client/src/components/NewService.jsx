/* eslint-disable max-len */
import React, { useState } from 'react';
import {
  Button, TextField, Typography, Fab, Grid,
  Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment,
} from '@material-ui/core';
import {
  Schedule, Add,
} from '@material-ui/icons';
import PropTypes from 'prop-types';

const EMPTY_SERVICE = {
  name: '',
  type: '',
  subtype: '',
  time: undefined,
  price: undefined,
  description: '',
  banner: '',
  addons: [],
};

const NewService = ({ onClickAdd }) => {
  const [open, setOpen] = useState(false);
  const [newService, setNewService] = useState(EMPTY_SERVICE);

  const updateNewService = ([param, val]) => {
    const updatedNewService = { ...newService };
    updatedNewService[param] = val;
    setNewService(updatedNewService);
  };

  const cancelNewService = () => {
    setOpen(false);
    setNewService(EMPTY_SERVICE);
  };

  const saveNewService = async () => {
    await onClickAdd(newService);
    setOpen(false);
    setNewService(EMPTY_SERVICE);
  };

  return (
    <>
      <Fab color="primary" size="small" onClick={() => setOpen(true)}>
        <Add />
      </Fab>
      <Dialog open={open} onClose={() => cancelNewService()}>
        <DialogTitle>New Service</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ display: 'flex', alignItems: 'center' }}>
            <Grid item xs={12} sm={6}>
              <TextField
                style={{ width: '100%' }}
                value={newService.name}
                onChange={(e) => updateNewService(['name', e.target.value])}
                label="Name"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                style={{ width: '100%' }}
                value={newService.type}
                onChange={(e) => updateNewService(['type', e.target.value])}
                label="Type"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                style={{ width: '100%' }}
                value={newService.subtype}
                onChange={(e) => updateNewService(['subtype', e.target.value])}
                label="subtype"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                style={{ width: '100%' }}
                value={newService.price}
                onChange={(e) => updateNewService(['price', Number.parseFloat(e.target.value)])}
                label="Price"
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Time"
                style={{ width: '100%' }}
                onChange={(e) => updateNewService(['time', Number.parseFloat(e.target.value)])}
                type="number"
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => updateNewService(['banner', e.target.value])}
                label="Banner"
                style={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                onChange={(e) => updateNewService(['description', e.target.value])}
                multiline
                style={{ width: '100%' }}
                label="Description"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => cancelNewService()}>
            Cancel
          </Button>
          <Button onClick={() => saveNewService()} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

NewService.propTypes = {
  onClickAdd: PropTypes.func.isRequired,
};

export default NewService;
