/* eslint-disable camelcase */
import React from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography, TextField, Button, InputAdornment, DialogActions,
} from '@material-ui/core';
import {
  ExpandMore,
} from '@material-ui/icons';
// import {
//   useHistory,
// } from 'react-router-dom';
import PropTypes from 'prop-types';
import useStyles from '../css/EditServiceStyles';

const EditUser = ({
  index, user, deleteUser, changeService, updateUser, userGroup, userGroupName, openValue,
}) => {
  const classes = useStyles();
  //   const history = useHistory();
  const [clicked, setClicked] = React.useState(true);
  // const [values, setValues] = service;
  const [name, setName] = React.useState(user.name);
  const [email, setType] = React.useState(user.email);
  const [phone_number, setSubType] = React.useState(user.phone_number);
  const [password, setTime] = React.useState(user.password);
  const [role, setPrice] = React.useState(user.role);
  const [open, setOpen] = React.useState(false);


  const renderSavedPage = () => {
    console.log(userGroup);
    console.log(index);
    console.log(user._id);
    changeService(user._id, {
      name,
      email,
      phone_number,
      password,
      role,
    });
  };

  const handleOpen = () => {
    setClicked(!clicked);
    setOpen(!open);
  };

  const handleCancel = () => {
    setClicked(!clicked);
    setOpen(false);
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <ExpansionPanel expanded={open}>
      <ExpansionPanelSummary
        onClick={handleOpen}
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {clicked
          ? (<Typography>{user.name}</Typography>
          )
          : (
            <TextField
              onClick={(e) => handleClick(e)}
              onChange={(e) => updateUser(userGroup, index, ['name', e.target.value])}
              defaultValue={user.name}
              className={classes.heading}
              style={{ border: '5px' }}
            />
          ) }
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <form className={classes.textfield} autoComplete="off">
          <TextField id="standard-basic" label="Email" defaultValue={user.email} onChange={(e) => updateUser(userGroup, index, ['email', e.target.value])} />
          <TextField id="standard-basic" label="PhoneNumber" defaultValue={user.phone_number} onChange={(e) => updateUser(userGroup, index, ['phone_number', e.target.value])} />
          <TextField id="standard-basic" label="Password" defaultValue={user.password} onChange={(e) => updateUser(userGroup, index, ['password', e.target.value])} />
          <TextField id="standard-basic" label="Role" defaultValue={user.role} onChange={(e) => updateUser(userGroup, index, ['role', Number(e.target.value)])} />
        </form>
      </ExpansionPanelDetails>
      <DialogActions>
        <Button variant="contained" color="grey" onClick={() => deleteUser(userGroupName, userGroup, index)}>
          Delete
        </Button>
        <div style={{ flex: '1 0 0' }} />
        <Button onClick={() => handleCancel()}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={() => renderSavedPage()}>
          Save
        </Button>
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
  }).isRequired,
  deleteUser: PropTypes.func.isRequired,
  changeService: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  userGroup: PropTypes.array.isRequired,
  userGroupName: PropTypes.string.isRequired,
  openValue: PropTypes.bool.isRequired,
};


export default EditUser;