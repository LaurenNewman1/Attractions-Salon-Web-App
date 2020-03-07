import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import profilePic from '../profileImage.jpg';

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


const Appointments = (props) => {
  const classes = useStyles();
  return (
    <>
      <div>
        <Avatar alt="Profile Pic" src={profilePic} className={classes.large} />
        John Doe
      </div>
      <Grid item xs={2}>
        Dhruv
      </Grid>
      <Grid item xs={2}>
        Dhruv1
      </Grid>
      <Grid item xs={2}>
        Dhruv2
      </Grid>
      <Grid item xs={2}>
        Dhruv3
      </Grid>
    </>
  );
};

export default Appointments;
