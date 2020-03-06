import React, { useState, useEffect } from 'react';
import {
  Typography, Grid, CircularProgress,
} from '@material-ui/core';
import Page from '../components/Page';
import useStyles from '../css/ServiceStyles';
import ServiceCard from '../components/ServiceCard';
import fetchServicesByType from '../stores/ServicesStores';

const Services = () => {
  const classes = useStyles();

  const [nails, setNails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNails(fetchServicesByType());
    setLoading(false);
    console.log(nails);
  }, nails);

  return (
    <Page>
      {loading ? <CircularProgress />
        : (
          <>
            <Typography variant="h4">Nails</Typography>
            <Grid container spacing={3} className={classes.container}>
              <Grid item xs={12} sm={6} md={3}>
                {!nails[0] ? null
                  : <ServiceCard service={nails[0]} />}
              </Grid>
            </Grid>
          </>
        )}
    </Page>
  );
};

export default Services;
