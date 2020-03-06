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
  const [wax, setWax] = useState([]);
  const [cuts, setCuts] = useState([]);
  const [dyes, setDyes] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [washes, setWashes] = useState([]);
  const [stylings, setStylings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNails(fetchServicesByType('nails'));
    setWax(fetchServicesByType('wax'));
    setCuts(fetchServicesByType('cuts'));
    setDyes(fetchServicesByType('dyes'));
    setTreatments(fetchServicesByType('treatments'));
    setWashes(fetchServicesByType('washes'));
    setStylings(fetchServicesByType('stylings'));
    setLoading(false);
  }, nails);

  return (
    <Page>
      {loading ? <CircularProgress />
        : (
          <>
            <Typography variant="h4">Nails</Typography>
            <Grid container spacing={3} className={classes.container}>
              {!nails ? null
                : nails.map((service) => (
                  <Grid item xs={12} sm={6} md={3}>
                    <ServiceCard service={service} />
                  </Grid>
                ))}
            </Grid>
            <Typography variant="h4" className={classes.header}>Wax</Typography>
            <Grid container spacing={3} className={classes.container}>
              {!wax ? null
                : wax.map((service) => (
                  <Grid item xs={12} sm={6} md={3}>
                    <ServiceCard service={service} />
                  </Grid>
                ))}
            </Grid>
            <Typography variant="h4" className={classes.header}>Hair Cuts</Typography>
            <Grid container spacing={3} className={classes.container}>
              {!cuts ? null
                : cuts.map((service) => (
                  <Grid item xs={12} sm={6} md={3}>
                    <ServiceCard service={service} />
                  </Grid>
                ))}
            </Grid>
            <Typography variant="h4" className={classes.header}>Hair Dyes</Typography>
            <Grid container spacing={3} className={classes.container}>
              {!dyes ? null
                : dyes.map((service) => (
                  <Grid item xs={12} sm={6} md={3}>
                    <ServiceCard service={service} />
                  </Grid>
                ))}
            </Grid>
            <Typography variant="h4" className={classes.header}>Hair Treatment</Typography>
            <Grid container spacing={3} className={classes.container}>
              {!treatments ? null
                : treatments.map((service) => (
                  <Grid item xs={12} sm={6} md={3}>
                    <ServiceCard service={service} />
                  </Grid>
                ))}
            </Grid>
            <Typography variant="h4" className={classes.header}>Hair Wash/Dry</Typography>
            <Grid container spacing={3} className={classes.container}>
              {!washes ? null
                : washes.map((service) => (
                  <Grid item xs={12} sm={6} md={3}>
                    <ServiceCard service={service} />
                  </Grid>
                ))}
            </Grid>
            <Typography variant="h4" className={classes.header}>Hair Styling</Typography>
            <Grid container spacing={3} className={classes.container}>
              {!stylings ? null
                : stylings.map((service) => (
                  <Grid item xs={12} sm={6} md={3}>
                    <ServiceCard service={service} />
                  </Grid>
                ))}
            </Grid>
          </>
        )}
    </Page>
  );
};

export default Services;
