import {
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  blackBox: {
    backgroundColor: 'black',
    padding: '40px',
    paddingBottom: '0px',
  },
  welcomeText: {
    color: 'white',
    textAlign: 'center',
  },
  bookBtn: {
    marginTop: '30px',
  },
  modelImg: {
    maxWidth: '50%',
  },
  leftContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '40px',
  },
}));

export default useStyles;
