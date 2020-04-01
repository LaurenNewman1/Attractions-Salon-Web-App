import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  header: {
    textAlign: 'center',
    marginTop: 0,
  },
  center: {
    textAlign: 'center',
  },
  divider: {
    display: 'flex',
    flewFlow: 'row nowrap',
    justifyContents: 'stretch',
    alignItems: 'center',
  },
  button: {
    textAlign: 'center',
    marginTop: 10,
  },
}));

export default useStyles;
