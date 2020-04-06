
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
  header: {
    marginTop: 40,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  add: {
    width: '45%',
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
}));

export default useStyles;
