import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  icon: {
    display: 'flex',
    alignItems: 'center',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    marginBottom: 20,
  },
  none: {
    width: '100%',
    textAlign: 'center',
  },
}));

export default useStyles;
