import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  leftContainer: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: 10,
    paddingTop: 20,
    wordWrap: 'anywhere',
  },
  rightContainer: {
    height: '100%',
    padding: 20,
    paddingTop: 0,
    textAlign: 'center',
    alignItems: 'center',
  },
  img: {
    height: 263,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
  swiperContainer: {
    maxWidth: 350,
    flexGrow: 1,
    display: 'inline-block',
  },
  stepper: {
    maxWidth: 350,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  stepperContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
}));


export default useStyles;
