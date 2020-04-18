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
  justify: {
    display: 'flex',
    justifyContent: 'center',
  },
  align: {
    display: 'flex',
    alignItems: 'center',
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
