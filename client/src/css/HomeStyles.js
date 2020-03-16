import {
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  page: {
    height: 'calc(100vh - 64px)',
  },
  blackBox: {
    backgroundColor: 'black',
    padding: '40px',
    paddingTop: '0px',
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
    maxHeight: '90%',
    objectFit: 'contain',
    position: 'relative',
    bottom: 0,
  },
  leftContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: '20px',
    height: '100%',
  },
  rightContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
}));

export default useStyles;
