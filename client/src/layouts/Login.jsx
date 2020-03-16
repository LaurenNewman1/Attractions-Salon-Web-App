import {
  Grid, TextField, InputAdornment, Button, Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Email, Lock } from '@material-ui/icons';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Page from '../components/Page';
import useStyles from '../css/LoginStyles';
import loginImg from '../images/loginImg.jpg';


const Login = ({ login, fromBookPage }) => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorBody, setErrorBody] = useState({});
  const [hasError, setHasError] = useState(false);

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
          <div className={classes.buttons}>
            <Typography variant="h5">
              -------------OR-------------
            </Typography>
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
  };

  return (
    <Page>
      <Grid container className={classes.page}>
        <Grid item xs={12} sm={6} className={classes.imgContainer}>
          <img src={loginImg} alt="" className={classes.modelImg} />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.form}>
          <h1 className={classes.login}>Login</h1>
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
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => attemptLogin()}
              >
                Login
              </Button>
              <br />
              <br />
              New to Attractions?
              {' '}
              <Link to="/signUp">Create Account</Link>
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
};


export default Login;
