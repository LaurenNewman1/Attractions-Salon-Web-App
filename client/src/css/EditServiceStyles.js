
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 10,
  },
  table: {
    width: '100%',
    height: '80%',
  },
  tableDiv: {
    // top: '100',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    // width: '88%',
  },
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
  loading: {
    position: 'absolute',
    top: '50%',
    bottom: '50%',
    left: '50%',
    right: '50%',
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
  textfield: {
    // '& .MuiTextField-root': {
    //   margin: theme.spacing(1),
    // },
  },
}));

export default useStyles;
