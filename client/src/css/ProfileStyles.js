import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  header: {
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  logout: {
    display: 'flex',
    justifyContent: 'center',
  },
  edit: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  adminButtons: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default useStyles;
