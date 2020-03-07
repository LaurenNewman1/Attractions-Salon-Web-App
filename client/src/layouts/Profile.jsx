import React from 'react';
import { TextField, Grid, Paper } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Email, Lock } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Page from '../components/Page';

const style = {
  Paper: { padding: 50, marginTop: 10, marginBottom: 10 },
};

const Profile = (props) => (
  <>
    <Page>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Paper style={style.Paper}>Picture Either Logo or Profile</Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={style.Paper}>
            <h1 style={{ textAlign: 'center' }}>Profile</h1>
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
              />
              <br />
              New to Attractions?
              {' '}
              <Link to="/SignUp">Create Account</Link>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Page>
  </>
);


export default Profile;
