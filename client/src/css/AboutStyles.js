import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  leftContainer: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: 10,
    paddingTop: 20,
    wordWrap: 'anywhere',
  },
  rightContainer: {
    height: '100%',
    padding: 30,
    paddingTop: 0,
    alignItems: 'center',
  },
  mission: {
    margin: 30,
  },
  img: {
    width: '100%',
    objectFit: 'cover',
    position: 'relative',
  },
  subtitle: {
    wordWrap: 'normal',
    overflowWrap: 'normal',
    overflow: 'normal',
    textOverflow: 'normal',
    whiteSpace: 'normal',
    paddingRight: '10%',
    paddingLeft: '10%',
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
      paddingLeft: 0,
    },
  },
  contactContainer: {
    backgroundColor: theme.palette.background.main,
    paddingTop: 40,
    paddingBottom: 40,
    paddingRight: '15%',
    paddingLeft: '15%',
    margin: 0,
    width: '100%',
  },
  photosContainer: {
    backgroundColor: theme.palette.secondary.main,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    paddingRight: '10%',
    paddingLeft: '10%',
    margin: 0,
    width: '100%',
  },
  teamContainer: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: 40,
    paddingBottom: 40,
    paddingRight: '10%',
    paddingLeft: '10%',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    marginBottom: 5,
  },
}));


export default useStyles;
