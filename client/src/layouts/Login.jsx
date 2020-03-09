import { Grid, TextField, InputAdornment, Button, } from '@material-ui/core';
import React, { useState } from 'react';
import Page from '../components/Page';
import useStyles from '../css/LoginStyles';
import loginImg from '../images/loginImg.jpg';
import { Email, Lock } from '@material-ui/icons';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const Login = ({ login }) => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const attemptLogin = async () => {
    if (await login(email, password)) {
      console.log("??")
      history.push('/profile')
    }
  }

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
                onClick={() => attemptLogin()}
              >
                Login
              </Button>
              <br />
              <br />
              New to Attractions?
              {' '}
              <Link to="/signUp">Create Account</Link>
            </div>
          </div>
        </Grid>
      </Grid>
    </Page>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};


export default Login;
