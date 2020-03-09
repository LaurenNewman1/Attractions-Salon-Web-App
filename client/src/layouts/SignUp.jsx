import React, { useState } from 'react';
import {
  Button, TextField, Grid, InputAdornment,
} from '@material-ui/core';
import {
  Email, Person, Phone, Lock,
} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import useStyles from '../css/LoginStyles';
import Page from '../components/Page';
import signUpImg from '../images/signUpImg.jpg';

const SignUp = ({ register }) => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const attemptRegister = async () => {
    if (await register(name, email, number, password)) {
      history.push('/login');
    }
  };

  return (
    <Page>
      <Grid container className={classes.page}>
        <Grid item xs={12} sm={6} className={classes.imgContainer}>
          <img src={signUpImg} alt="" className={classes.modelImg} />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.form}>
          <h1 className={classes.login}>Sign Up</h1>
          <div>
            <TextField
              fullWidth
              type
              className={classes.field}
              helperText="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              type="email"
              className={classes.field}
              helperText="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              className={classes.field}
              helperText="Phone Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
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
              type="password"
              className={classes.field}
              helperText="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => attemptRegister()}
              >
                Create Account
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </Page>
  );
};

SignUp.propTypes = {
  register: PropTypes.func.isRequired,
};

export default SignUp;
