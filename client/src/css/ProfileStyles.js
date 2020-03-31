import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  iconButton: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  buttons: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default useStyles;
