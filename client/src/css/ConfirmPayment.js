import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  page: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10,
  },
  login: {
    textAlign: 'center',
  },
  buttons: {
    paddingTop: 10,
    textAlign: 'center',
  },
  zipCode: {
    marginTop: 15,
  },
  checkBox: {
    paddingTop: 30,
    textAlign: 'center',
  },
  divider: {
    paddingLeft: 50,
    paddingRight: 50,
    display: 'flex',
    flewFlow: 'row nowrap',
    justifyContents: 'stretch',
    alignItems: 'center',
  },
  paper: {
    padding: 20,
    textAlign: 'center',
    // This doesn't work
    borderRadius: 20, // "20px"
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'flex start',
    alignItems: 'stretch',
    height: 180,
    width: 400,
    backgroundColor: '#40cec5',

  },
  spacing: {
    display: 'flex',
  },
  middleSpace: {
    flex: '1 0 auto',
  },
  circles: {
    maxWidth: 100,
    maxHeight: 100,
    float: 'left',
  },
  link: {
    float: 'right',
    color: 'black',
    paddingRight: '10%',
  },
  actualLink: {
    color: 'black',
  },
}));

export default useStyles;
