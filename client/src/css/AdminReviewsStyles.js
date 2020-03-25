import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  header: {
    paddingTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    whiteSpace: 'nowrap',
  },
  grow: {
    flexGrow: 1,
  },
  content: {
    width: '100%',
    marginTop: 10,
  },
}));

export default useStyles;
