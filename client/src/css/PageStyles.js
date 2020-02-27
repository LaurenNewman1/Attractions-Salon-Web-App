import {
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  logo: {
    fontFamily: 'cursive',
    fontWeight: 'bold',
  },
  background: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    overflow: 'hidden',
    padding: 0,
    backgroundColor: theme.palette.background.main,
  },
  body: {
    height: '100%',
  },
}));

export default useStyles;
