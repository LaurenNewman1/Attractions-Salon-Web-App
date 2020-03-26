import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({

  login: {
    textAlign: 'center',
  },
  buttons: {
    paddingTop: 20,
    textAlign: 'center',
  },
  spacing: {
    display: 'flex',
  },
  middleSpace: {
    flex: '1 0 auto',
  },
  information: {
    marginLeft: 60,
    marginRight: 60,
  },
  card: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'transparent',
  },
  media: {
    height: 90,
  },
  cardContent: {
    margin: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    marginTop: 10,
    marginBottom: 10,
  },
}));

export default useStyles;
