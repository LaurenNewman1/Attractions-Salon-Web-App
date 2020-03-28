import {
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  grow: {
    flexGrow: 1,
  },
  topPagePadding: {
    paddingTop: '1em',
  },
  logo: {
    fontFamily: 'cursive',
    fontWeight: 'bold',
  },
  background: {
    minHeight: 'calc(100vh - 64px)',
    width: '100%',
    padding: 0,
    backgroundColor: theme.palette.background.main,
  },
}));

export default useStyles;
