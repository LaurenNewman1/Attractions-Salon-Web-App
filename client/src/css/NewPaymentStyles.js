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
}));

export default useStyles;
