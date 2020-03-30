import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  header: {
    textAlign: 'center',
    marginTop: 0,
    paddingTop: 5,
  },
  divider: {
    flexGrow: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  buttons: {
    paddingTop: 20,
    textAlign: 'center',
  },
  spacing: {
    display: 'flex',
    justifyContent: 'space-between',
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
}));

export default useStyles;
