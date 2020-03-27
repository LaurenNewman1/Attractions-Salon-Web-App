import {
  Grid, TextField, InputAdornment, Button,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Lock } from '@material-ui/icons';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Page from '../components/Page';
import useStyles from '../css/LoginStyles';
import loginImg from '../images/loginImg.jpg';


const ResetPassword = ({ attemptReset }) => {
  const classes = useStyles();
  const history = useHistory();
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [errorBody, setErrorBody] = useState({});
  const [hasError, setHasError] = useState(false);

  const submitReset = async () => {
    setHasError(false);
    setErrorBody({});

    if (password !== confirmPass) {
      setHasError(true);
      setErrorBody({
        error: 'Passwords do not match',
      });
      return;
    }

    if (!(await attemptReset(token, password))) {
      setHasError(true);
      setErrorBody({
        error: 'Invalid link used',
      });
      return;
    }

    history.push('/login');
  };

  const errorHelpingText = hasError ? errorBody.error : '';

  return (
    <Page>
      <Grid container className={classes.page}>
        <Grid item xs={12} sm={6} className={classes.imgContainer}>
          <img src={loginImg} alt="" className={classes.modelImg} />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.form}>
          <h1 className={classes.login}>Reset your Password</h1>
          <div>
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
            <TextField
              fullWidth
              type="password"
              className={classes.field}
              error={hasError}
              helperText={hasError ? errorHelpingText : 'Repeat Password'}
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
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
                onClick={() => submitReset()}
              >
                Change Password
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </Page>
  );
};

ResetPassword.propTypes = {
  attemptReset: PropTypes.func.isRequired,
};


export default ResetPassword;
