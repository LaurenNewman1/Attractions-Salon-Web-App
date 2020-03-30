import {
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  grow: {
    flexGrow: 1,
  },
  topPagePadding: {
    marginBottom: 0,
  },
  sidePadding: {
    paddingTop: '1em',
    paddingLeft: '1em',
    paddingRight: '1em',
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
