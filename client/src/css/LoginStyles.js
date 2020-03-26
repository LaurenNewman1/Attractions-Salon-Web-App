import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  page: {
    height: 'calc(100vh - 64px)',
    display: 'flex',
    alignItems: 'center',
  },
  modelImg: {
    maxHeight: '100%',
    objectFit: 'cover',
    position: 'relative',
    bottom: 0,
  },
  form: {
    padding: '5%',
  },
  imgContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  login: {
    textAlign: 'center',
  },
  buttons: {
    paddingTop: 20,
    textAlign: 'center',
  },
  linkButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
    margin: 0,
    color: 'purple',
    padding: 0,
    '&:hover': {
      textDecoration: 'none',
    },
    '&:focus': {
      textDecoration: 'none',
    },
  },
}));

export default useStyles;
