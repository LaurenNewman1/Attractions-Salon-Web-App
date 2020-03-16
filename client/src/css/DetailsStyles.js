import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  textfield: {
    width: '100%',
    marginBottom: 5,
  },
  media: {
    height: 70,
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
  header: {
    textAlign: 'center',
  },
  card: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'transparent',
  },
  cardSelected: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: theme.palette.primary.main,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));


export default useStyles;
