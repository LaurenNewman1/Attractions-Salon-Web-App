import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  page: {
    display: 'flex',
    justifyContent: 'center',
  },
  spacing: {
    marginBottom: 40,
  },
  title: {
    marginBottom: 40,
    marginTop: 50,
  },
  button: {
    height: '40px',
    width: '150px',
    borderRadius: 6,
  },
}));


export default useStyles;
