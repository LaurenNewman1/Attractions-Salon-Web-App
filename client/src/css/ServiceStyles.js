import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
  },
  media: {
    height: 150,
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  time: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center',
  },
  price: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  pricePaper: {
    padding: 2,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
    marginRight: 5,
    backgroundColor: theme.palette.secondary.main,
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
  truncateOverflow: {
    overflow: 'hidden',
    height: 60,
  },
}));

export default useStyles;
