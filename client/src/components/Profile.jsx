import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  medium: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

// <Avatar alt="Avatar 1 Pic" src={Avatar1Pic} className={classes.medium} />
const Profile = (props) => {
  const classes = useStyles();
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', paddingLeft: 50}}>
        <AccountCircle 
        style={{ fontSize: 120, color: green[500] }}
        // This needs to be 
        color="background.dark"
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', paddingLeft: 50}}>
        <Typography variant="h6" gutterBottom>
            John Doe
        </Typography>
      </div>
    </>
  );
};


export default Profile;
