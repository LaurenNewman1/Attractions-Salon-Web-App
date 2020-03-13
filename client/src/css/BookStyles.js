import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  page: {
    height: 'calc(100vh - 64px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  container: {
    height: '100%',
  },
  footer: {
    position: 'fixed',
    left: 0,
    bottom: 20,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  stepper: {
    width: '80%',
  },
}));


export default useStyles;
