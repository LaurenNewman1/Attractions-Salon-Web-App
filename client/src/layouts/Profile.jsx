import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ProfileComponent from '../components/Profile';
import Appointments from '../components/Appointments';
import Page from '../components/Page';


const style = {
  Paper: { padding: 20, marginTop: 10, marginBottom: 10 },
  Paper2: { padding: 10, marginTop: 5, marginBottom: 5 },
};


// <Grid item xs={12} md={6}>
//   <Paper style={style.Paper}>Picture Either Logo or Profile</Paper>
// </Grid>
const Profile = (props) => {
  // This is just bc of eslint return statement thing
  const temp = null;
  return (
    <Page>
      <div>
        <h1 style={{ textAlign: 'center' }}>
          Profile
        </h1>
      </div>
          <div style={style.Paper2} elevation={5}>
      <Grid container style={{ paddingLeft: 200, paddingRight: 200, paddingTop: 10, alignItems: "center" }}>
        <Grid item xs={12} md={6}>
            <ProfileComponent />
        </Grid>
        <Grid item xs={12} md={6}>
            <div
              className="Person Details"
              style={{ paddingLeft: 60 }}
            >
              <Typography variant="h6" gutterBottom>
                Email: JohnDoe@gmail.com
              </Typography>
              <Typography variant="h6" gutterBottom>
                Phone: (###) ### - ####
              </Typography>
              <Typography variant="h6" gutterBottom>
                Card: .... .... .... 1234
              </Typography>
            </div>
        </Grid>
      </Grid>
          </div>
      <div>
        <h1 style={{ textAlign: 'center' }}>Appointment History</h1>
        <Paper style={style.Paper2}>
          <Appointments />
        </Paper>
      </div>
    </Page>
  );
};


export default Profile;
