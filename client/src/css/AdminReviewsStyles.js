import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  header: {
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
  fabButton: {
    marginLeft: '0.5em',
    marginRight: '0.5em',
  },
  label: {
    lineHeight: '42px',
    paddingTop: '3px',
  },
}));

export default useStyles;
