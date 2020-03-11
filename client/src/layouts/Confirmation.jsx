import React from 'react';
import { Grid } from '@material-ui/core';
import Page from '../components/Page';
import useStyles from '../css/ConfirmationStyles';

const Confirmation = () => {
  const classes = useStyles();

  return (
    <Page>
      <Grid container className={classes.page}>
        <div>Confirmation</div>
      </Grid>
    </Page>
  );
};

export default Confirmation;
