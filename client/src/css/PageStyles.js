import {
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
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
    padding: 0,
    backgroundColor: theme.palette.background.main,
  },
}));

export default useStyles;
