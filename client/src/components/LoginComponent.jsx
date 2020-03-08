import React from 'react';
import {
  Button, TextField,
} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Email, Lock } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';




// This is for later
const history = useHistory();
const changePage = (history) => {
  history.push('/Profile');
};
// onClick={() => updateHistory(history)};

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const updateEmail = (/** @type {React.ChangeEvent<HTMLInputElement>} */ event) => {
    const inputValue = event.target.value;
    setEmail(inputValue);
  };
  
  const updatePassword = (/** @type {React.ChangeEvent<HTMLInputElement>} */ event) => {
    const inputValue = event.target.value;
    setPassword(inputValue);
  };
  
  const updateLogin = (email, password) => {
    props.loginClick(email, password);
  };

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
          onChange={updateEmail}
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
          onChange={updatePassword}
        />
        <div style={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            style={{ justifyContent: 'center' }}
            onClick={() => updateLogin(email, password)}
          >
            Login
          </Button>
          <br />
          <br />
          New to Attractions?
          {' '}
          <Link to="/SignUp">Create Account</Link>
        </div>
      </div>
    </>
  );
};


export default Login;
