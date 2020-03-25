import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  page: {
    display: 'flex',
    alignItems: 'center',
  },
  textfield: {
    width: '23%',
    marginLeft: '2.6%',
    marginTop: 19,
  },
  textfield2: {
    width: '23%',
    marginTop: 19,
  },
  CVV: {
    marginTop: 15,
  },
  inputLabel: {
    paddingTop: '10%',
  },
  modelImg: {
    maxHeight: '100%',
    objectFit: 'cover',
    position: 'relative',
    bottom: 0,
  },
  form: {
    padding: '5%',
  },
  imgContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
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
    paddingTop: 20,
    textAlign: 'center',
  },
  divider: {
    display: 'flex',
    flewFlow: 'row nowrap',
    justifyContents: 'stretch',
    alignItems: 'center',
  },
  paper: {
    padding: 20,
    textAlign: 'center',
    // This doesn't work
    borderRadius: '10',
    backgroundColor: 'primary',
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
}));

export default useStyles;
