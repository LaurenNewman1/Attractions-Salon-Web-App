import {
  Grid, TextField, InputAdornment, Button, Typography, Divider,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Email, Lock } from '@material-ui/icons';
import { useHistory, Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Page from '../components/Page';
import useStyles from '../css/LoginStyles';
import loginImg from '../images/loginImg.jpg';


const Login = ({ login, fromBookPage, resetPassword }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorBody, setErrorBody] = useState({});
  const [hasError, setHasError] = useState(false);

  // Resetting Password Feature, reuses the email state for the form.
  const resettingPassword = location.pathname === '/login/reset';

  const submitResetPassword = async () => {
    await resetPassword(email);
    history.push('/login');
  };

  const resetLink = (
    <>
      {'Can\'t Login?'}
      {' '}
      <Link to="/login/reset" className={classes.link}>Reset Password</Link>
    </>
  );

  const goBackResetLink = (
    <>
      Looking to Login?
      {' '}
      <Link to="/login">Login</Link>
    </>
  );

  const attemptLogin = async () => {
    const [successful, error] = await login(email, password);
    setHasError(!successful);
    if (successful) {
      history.push('/profile');
    } else {
      setErrorBody(error);
    }
  };

  const errorHelpingText = hasError ? errorBody.error : '';

  const routeToBook = () => {
    history.push('/book');
  };

  const renderBookPage = () => {
    if (fromBookPage) {
      return (
        <>
          <div className={classes.divider}>
            <Divider variant="middle" style={{ flexGrow: 1 }} />
            <Typography variant="h5">
              OR
            </Typography>
            <Divider variant="middle" style={{ flexGrow: 1 }} />
          </div>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => routeToBook()}
            >
              Proceed Without Account
            </Button>
          </div>
        </>
      );
    }
    return null;
  };

  const pageTitle = resettingPassword ? 'Reset your Password' : 'Login';

  return (
    <Page>
      <Grid container className={classes.page}>
        <Grid item xs={12} sm={6} className={classes.imgContainer}>
          <img src={loginImg} alt="" className={classes.modelImg} />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.form}>
          <h1 className={classes.login}>{pageTitle}</h1>
          <div>
            <TextField
              fullWidth
              type="email"
              error={hasError}
              className={classes.field}
              helperText={hasError ? errorHelpingText : 'Email Address'}
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
            {resettingPassword ? null
              : (
                <TextField
                  fullWidth
                  type="password"
                  className={classes.field}
                  error={hasError}
                  helperText={hasError ? errorHelpingText : 'Password'}
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
              )}
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => (resettingPassword ? submitResetPassword() : attemptLogin())}
              >
                {resettingPassword ? 'Reset' : 'Login'}
              </Button>
              <br />
              <br />
              {resettingPassword ? goBackResetLink : resetLink}
              <br />
              <br />
              New to Attractions?
              {' '}
              <Link to="/signUp" className={classes.link}>Create Account</Link>
              {renderBookPage()}
            </div>
          </div>
        </Grid>
      </Grid>
    </Page>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  fromBookPage: PropTypes.bool.isRequired,
  resetPassword: PropTypes.func.isRequired,
};


export default Login;
