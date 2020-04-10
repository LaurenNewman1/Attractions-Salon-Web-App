import React from 'react';
import {
  ExpansionPanel, Select, FormControl,
  ExpansionPanelSummary, InputLabel,
  ExpansionPanelDetails, MenuItem, Grid,
  Typography, TextField, Button, DialogActions,
  Chip, Input,
} from '@material-ui/core';
import {
  ExpandMore,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import useStyles from '../css/EditServiceStyles';

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

const EditUser = ({
  index, user, deleteUser, saveUser, updateUser, userGroup, userGroupName, open,
  expandChange, cancelChanges, subtypes,
}) => {
  const classes = useStyles();
  // subtypes.map((sub) => console.log(sub));
  return (
    <ExpansionPanel
      expanded={open.i === index && open.list === userGroupName}
      onChange={expandChange(index, userGroupName)}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        {open.i === index && open.list === userGroupName
          ? (
            <TextField
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => updateUser(userGroupName, index, ['name', e.target.value])}
              value={user.name}
              className={classes.heading}
              style={{ border: '5px' }}
            />
          )
          : (
            <Typography>{user.name}</Typography>
          ) }
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={2} style={{ display: 'flex', alignItems: 'center' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              value={user.email}
              onChange={(e) => updateUser(userGroupName, index, ['email', e.target.value])}
              style={{ width: '100% ' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              value={user.phone_number}
              onChange={(e) => updateUser(userGroupName, index, ['phone_number', e.target.value])}
              style={{ width: '100% ' }}
            />
          </Grid>
          {subtypes && user.specialties ? (
            <Grid item xs={12} sm={6}>
              <FormControl style={{ minWidth: 100 }}>
                <InputLabel>Specialties</InputLabel>
                <Select
                  multiple
                  value={user.specialties}
                  onChange={(event) => updateUser(userGroupName, index, ['specialties', event.target.value])}
                  input={<Input />}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} className={classes.chip} color="secondary" />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {subtypes.map((add) => (
                    <MenuItem key={add} value={add}>
                      {add}
                      {' '}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ) : null}
          <Grid item xs={12} sm={6}>
            <FormControl style={{ width: '100% ' }}>
              <InputLabel>Role</InputLabel>
              <Select
                value={user.role}
                onChange={(e) => updateUser(userGroupName, index, ['role', e.target.value])}
                MenuProps={MenuProps}
              >
                <MenuItem value={2}>Admin</MenuItem>
                <MenuItem value={1}>Staff</MenuItem>
                <MenuItem value={0}>Client</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
      <DialogActions>
        <Button variant="contained" onClick={() => deleteUser(userGroupName, userGroup, index)}>
          Delete
        </Button>
        <div style={{ flex: '1 0 0' }} />
        <Button onClick={() => cancelChanges(index, userGroupName)}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={() => saveUser(user._id)}>Save</Button>
      </DialogActions>
    </ExpansionPanel>
  );
};

EditUser.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    role: PropTypes.number.isRequired,
    specialties: PropTypes.array.isRequired,
  }).isRequired,
  deleteUser: PropTypes.func.isRequired,
  saveUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  userGroup: PropTypes.array.isRequired,
  userGroupName: PropTypes.string.isRequired,
  open: PropTypes.shape({
    i: PropTypes.number.isRequired,
    list: PropTypes.string.isRequired,
  }).isRequired,
  expandChange: PropTypes.func.isRequired,
  cancelChanges: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  subtypes: PropTypes.array.isRequired,
};


export default EditUser;
