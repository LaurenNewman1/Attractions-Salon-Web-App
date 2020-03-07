import React from 'react';
import {
  Button, TextField,
} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Email, Person, Phone, Lock } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const changePage = (history) => {
  history.push('/Profile');
};
// <Link to="/SignUp">Create Account</Link>

const SignUp = (props) => {
  const history = useHistory();
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>SignUp</h1>
      <div>
        <TextField
          fullWidth
          type
          helperText="Full Name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          type
          helperText="Email Address"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          type
          helperText="Phone Number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          type
          helperText="Password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" color="primary" onClick={() => changePage(history)}>
          Create Account
        </Button>
        {' '}
      </div>
    </>
  );
};


export default SignUp;
