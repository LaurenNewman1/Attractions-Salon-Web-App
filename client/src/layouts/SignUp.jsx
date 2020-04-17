import React, { useState } from 'react';
import {
  Button, TextField, Grid, InputAdornment, Hidden,
} from '@material-ui/core';
import {
  Email, Person, Phone, Lock,
} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Recaptcha from 'react-google-recaptcha';
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
  const [errorBody, setErrorBody] = useState({});
  const [hasError, setHasError] = useState(false);

  const captchaRef = React.createRef();


  const validationTable = {
    email: {
      required: 'Email is required.',
    },
    name: {
      required: 'Name is required.',
    },
  };

  const getAvailableErrors = (field) => {
    if (!hasError) return false;
    if (!errorBody.errors) return false;
    if (!errorBody.errors[field]) return false;

    return validationTable[field][errorBody.errors[field].kind];
  };

  const attemptRegister = async () => {
    const [successful, errors] = await register(name, email, number, password, captchaRef.current.getValue());
    setErrorBody({});
    setHasError(!successful);
    if (successful) {
      history.push('/login');
    } else {
      setErrorBody(errors);
    }
  };

  return (
    <Page maxWidth={false}>
      <Grid container className={classes.page}>
        <Hidden xsDown>
          <Grid item xs={12} sm={6} className={classes.imgContainer}>
            <img src={signUpImg} alt="" className={classes.modelImg} />
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={6} className={classes.form}>
          <h1 className={classes.login}>Sign Up</h1>
          <div>
            <TextField
              fullWidth
              type
              className={classes.field}
              error={getAvailableErrors('name')}
              helperText={hasError ? getAvailableErrors('name') : 'Full Name'}
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
              error={getAvailableErrors('email')}
              helperText={hasError ? getAvailableErrors('email') : 'Email Address'}
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
            <div style={{ textAlign: 'center' }}>
              <Recaptcha
                sitekey="6Lde1ukUAAAAAJkNP90HjfZwFcYrtNk0CGAWb34R"
                onChange={(e) => console.log(e)}
                ref={captchaRef}
                className={classes.gRecaptcha}
              />
            </div>
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
