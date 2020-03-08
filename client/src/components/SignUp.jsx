import React from 'react';
import {
  Button, TextField,
} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
    Email, Person, Phone, Lock,
} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';


const history = useHistory();
const changePage = (history) => {
    history.push('/Profile');
};

const SignUp = (props) => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [name, setName] = useState('');
const [number, setNumber] = useState('');


  const updateEmail = (/** @type {React.ChangeEvent<HTMLInputElement>} */ event) => {
    const inputValue = event.target.value;
    setEmail(inputValue);
  };
  
  const updatePassword = (/** @type {React.ChangeEvent<HTMLInputElement>} */ event) => {
      const inputValue = event.target.value;
      setPassword(inputValue);
    };
    
    const updateName = (/** @type {React.ChangeEvent<HTMLInputElement>} */ event) => {
        const inputValue = event.target.value;
        setName(inputValue);
    };
    
    const updateNumber = (/** @type {React.ChangeEvent<HTMLInputElement>} */ event) => {
        const inputValue = event.target.value;
        setNumber(inputValue);
    };
    

  const updateRegister = (name, email, number, password) => {
    props.createAccountClick(name, email, number, password);
  };
  

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
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
          onChange={updateName}
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
          onChange={updateEmail}
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
          onChange={updateNumber}
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
          <Button variant="contained" color="primary" onClick={() => updateRegister(name, email, number, password)}>
            Create Account
          </Button>
        </div>
      </div>
    </>
  );
};


export default SignUp;
