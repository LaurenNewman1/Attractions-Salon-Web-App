import {
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  page: {
    height: '100%',
  },
  blackBox: {
    backgroundColor: 'black',
    padding: '40px',
    paddingBottom: '0px',
    height: '100%',
  },
  welcomeText: {
    color: 'white',
    textAlign: 'center',
  },
  bookBtn: {
    marginTop: '30px',
  },
  modelImg: {
    maxWidth: '100%',
    objectFit: 'contain',
    height: '100%',
  },
  leftContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: '80px',
    height: '100%',
  },
  rightContainer: {
    height: '100%',
  },
}));

export default useStyles;
