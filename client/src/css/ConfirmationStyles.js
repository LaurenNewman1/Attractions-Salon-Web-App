import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  page: {
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    fontSize: '400%',
    color: theme.palette.secondary.main,
    marginBottom: 30,
  },
  spacing: {
    marginBottom: 30,
  },
}));


export default useStyles;
