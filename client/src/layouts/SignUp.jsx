import React from 'react';
import {
  Button, TextField, Grid, InputAdornment,
} from '@material-ui/core';
import {
  Email, Person, Phone, Lock,
} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import useStyles from '../css/LoginStyles';
import Page from '../components/Page';
import signUpImg from '../images/signUpImg.jpg';

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Page>
      <Grid container className={classes.page}>
        <Grid item xs={12} sm={6} className={classes.imgContainer}>
          <img src={signUpImg} alt="" className={classes.modelImg} />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.form}>
          <h1 className={classes.login}>SignUp</h1>
          <div>
            <TextField
              fullWidth
              type
              className={classes.field}
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
              className={classes.field}
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
              className={classes.field}
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
              className={classes.field}
              helperText="Password"
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
                onClick={() => history.push('/profile')}
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


export default SignUp;
