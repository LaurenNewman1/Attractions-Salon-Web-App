import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  page: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
  },
  stepper: {
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
  },
  toolbar: theme.mixins.toolbar,
}));


export default useStyles;
