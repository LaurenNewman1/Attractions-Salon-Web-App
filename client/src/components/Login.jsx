import React from 'react';
import {
  Button, TextField,
} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Email, Lock } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';

const changePage = (history) => {
  history.push('/Profile');
};

const Login = (props) => {
  const history = useHistory();
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Login</h1>
      <div>
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
          helperText="Password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ justifyContent: 'center' }}
          onClick={() => changePage(history)}
        >
          Login
        </Button>
        <br />
        New to Attractions?
        {' '}
        <Link to="/SignUp">Create Account</Link>
      </div>
    </>
  );
};

export default Login;
