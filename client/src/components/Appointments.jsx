import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import hairPic from '../curlyHair.jpg';

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


const Appointments = () => {
  const classes = useStyles();
  return (
    <>
      <div>
        <Avatar alt="Hair Pic" src={hairPic} className={classes.large} />
        John Doe
      </div>
    </>
  );
};

export default Appointments;
