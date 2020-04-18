import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  iconButton: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  leftContainerSmall: {
    display: 'flex',
    justifyContent: 'center',
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
