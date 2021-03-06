
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageHead: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    whiteSpace: 'nowrap',
  },
  button: {
    position: 'absolute',
    right: '35%',
    fontSize: '200px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  addonsLbl: {
    display: 'flex',
    alignItems: 'center',
    margin: 10,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    marginRight: 2,
  },
}));

export default useStyles;
