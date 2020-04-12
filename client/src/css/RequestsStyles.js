import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  icon: {
    display: 'flex',
    alignItems: 'center',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    marginRight: 2,
  },
  card: {
    marginBottom: 20,
  },
  none: {
    width: '100%',
    textAlign: 'center',
  },
  payInStore: {
    color: theme.palette.primary.dark,
  },
}));

export default useStyles;
