import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Page from '../components/Page';
import profilePic from '../profileImage.jpg';

const style = {
  Paper: { padding: 50, marginTop: 10, marginBottom: 10 },
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

// <Grid item xs={12} md={6}>
//   <Paper style={style.Paper}>Picture Either Logo or Profile</Paper>
// </Grid>
const Profile = (props) => {
  const classes = useStyles();
  return (
    <Page>
      <Grid container>
        <Grid item xs={12} md={12}>
          <Paper style={style.Paper}>
            <div>
              <h1 style={{ textAlign: 'center' }}>
                Profile
              </h1>
            </div>
            <div style={{ textAlign: 'left' }}>
              <Avatar alt="Profile Pic" src="../profileImage.jpg" className={classes.large} />
              John Doe
            </div>
            <div
              className="Person Details"
              style={{ textAlign: 'right' }}
            >
              Email: JohnDoe@gmail.com
              <br />
              Phone: (###) ### - ####
              <br />
              Card: .... .... .... 1234
              <br />
            </div>
          </Paper>

          <Paper>
            <div>
              <h1 style={{ textAlign: 'center' }}>Appointment History</h1>
              Dhruv SOS Boss
            </div>
          </Paper>

        </Grid>
      </Grid>
    </Page>
  );
};


export default Profile;
