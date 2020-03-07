import React from 'react';
import {
  Button, TextField,
} from '@material-ui/core';
import { Call } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';

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
        <TextField fullWidth type helperText="Email Address" />
        <TextField fullWidth type helperText="Password" />
        <Call />
        <Button variant="contained" color="primary" onClick={() => changePage(history)}>
          Create Account
        </Button>
        {' '}
      </div>
    </>
  );
};


export default SignUp;
