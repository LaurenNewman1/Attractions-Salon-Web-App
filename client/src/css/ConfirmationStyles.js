import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  page: {
    height: 'calc(100vh - 64px)',
    display: 'flex',
    alignItems: 'center',
    background: 'white',
    color: 'black',
    justifyContent: 'center',
  },
  centerCol: {
    height: 'calc(100vh - 64px)',
    background: '#fafafa',
  },
  text: {
    fontSize: '28px',
    textAlign: 'center',
    padding: '10vh',
  },
  icon: {
    fontSize: '300%',
    color: '#00eb7d',
  },
}));


export default useStyles;
