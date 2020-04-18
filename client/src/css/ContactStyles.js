import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: '0',
    // padding: theme.spacing(1.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'white',
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
  leftContainer: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: 10,
    paddingTop: 20,
    wordWrap: 'anywhere',
  },
  rightContainer: {
    height: '100%',
    padding: 20,
  },
  reviewContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  profileImg: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '80%',
    height: 'auto',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
  },
  review: {
    height: 80,
    overflow: 'hidden',
  },
}));


export default useStyles;
