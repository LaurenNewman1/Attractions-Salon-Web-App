import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: '0',
    padding: theme.spacing(1.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: '#6d6c6c',
    height: '90vh',
  },
  black: {
    backgroundColor: '#6d6c6c',
  },
  text: {
    top: '20vh',
    position: 'relative',
    color: theme.palette.primary.light,
  },
  button: {
    position: 'absolute',
    bottom: 0,
  },
}));


export default useStyles;
