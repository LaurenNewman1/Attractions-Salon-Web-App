
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 10,
  },
  table: {
    width: '60%',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageHead: {
    textAlign: 'center',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  //   truncateOverflow: {
  //     overflow: 'hidden',
  //     height: 60,
  //   },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  textfield: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

export default useStyles;
