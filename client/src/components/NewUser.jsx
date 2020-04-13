import React, { useState, memo } from 'react';
import {
  Button, TextField, Fab, Grid, FormControl, InputLabel, Select,
  Dialog, DialogActions, DialogContent, DialogTitle, MenuItem,
} from '@material-ui/core';
import {
  Add,
} from '@material-ui/icons';
import PropTypes from 'prop-types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const NewUser = ({ onClickAdd, updateNewUser, newUser }) => {
  const [open, setOpen] = useState(false);

  const addAddon = async () => {
    if (newUser.role === '' || newUser.name === '' || newUser.password === '' || newUser.email === '' || newUser.phone_number === '') {
      onClickAdd();
      setOpen(true);
    } else {
      setOpen(false);
      onClickAdd();
    }
  };

  return (
    <>
      <Fab color="primary" size="small" onClick={() => setOpen(true)}><Add /></Fab>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add a User</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ display: 'flex', alignItems: 'center' }}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => updateNewUser(['name', e.target.value])}
                label="Name"
                style={{ width: '100%' }}
                error={newUser.name === ''}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => updateNewUser(['email', e.target.value])}
                label="Email"
                style={{ width: '100%' }}
                error={newUser.email === ''}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => updateNewUser(['phone_number', e.target.value])}
                label="Phone Number"
                style={{ width: '100%' }}
                error={newUser.phone_number === ''}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => updateNewUser(['password', e.target.value])}
                label="Password"
                style={{ width: '100%' }}
                error={newUser.password === ''}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                style={{ width: '100% ' }}
                error={newUser.role === null}
                required
              >
                <InputLabel>Role</InputLabel>
                <Select
                  defaultValue=""
                  onChange={(e) => updateNewUser(['role', e.target.value])}
                  MenuProps={MenuProps}
                  error={newUser.email === null}
                  required
                >
                  <MenuItem value={2}>Admin</MenuItem>
                  <MenuItem value={1}>Staff</MenuItem>
                  <MenuItem value={0}>Client</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {newUser.role !== 0 && newUser.role !== null
              ? (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={(e) => updateNewUser(['title', e.target.value])}
                      label="Title"
                      style={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={(e) => updateNewUser(['bio', e.target.value])}
                      label="Bio"
                      style={{ width: '100%' }}
                    />
                  </Grid>
                </>
              ) : null}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => addAddon()} color="primary" variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
NewUser.propTypes = {
  onClickAdd: PropTypes.func.isRequired,
  updateNewUser: PropTypes.func.isRequired,
  newUser: PropTypes.object.isRequired,
};
export default memo(NewUser);
