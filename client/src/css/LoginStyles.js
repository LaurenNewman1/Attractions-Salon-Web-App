import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
    paddingLeft: '5%',
    paddingRight: '5%',
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
  link: {
    color: theme.palette.secondary.dark,
  },
  divider: {
    paddingTop: 20,
    textAlign: 'center',
    paddingLeft: 50,
    paddingRight: 50,
    display: 'flex',
    flewFlow: 'row nowrap',
    justifyContents: 'stretch',
    alignItems: 'center',
  },
}));

export default useStyles;
