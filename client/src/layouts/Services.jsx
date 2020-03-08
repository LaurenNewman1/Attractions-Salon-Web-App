import React, { useState, useEffect } from 'react';
import {
  Typography, Grid, CircularProgress,
} from '@material-ui/core';
import Page from '../components/Page';
import useStyles from '../css/ServiceStyles';
import ServiceCard from '../components/ServiceCard';
import fetchServicesByType from '../stores/ServicesStore';

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

  useEffect(async () => {
    setLoading(true);
    setNails(await fetchServicesByType('nails'));
    setWax(await fetchServicesByType('wax'));
    setCuts(await fetchServicesByType('cuts'));
    setDyes(await fetchServicesByType('dyes'));
    setTreatments(await fetchServicesByType('treatments'));
    setWashes(await fetchServicesByType('washes'));
    setStylings(await fetchServicesByType('stylings'));
    setLoading(false);
  }, []);

  return (
    <Page>
      {loading ? <CircularProgress />
        : (
          <>
            <Typography variant="h4">Nails</Typography>
            <Grid container spacing={3} className={classes.container}>
              {!nails.length ? null
                : nails.map((service) => (
                  <Grid item xs={12} sm={6} md={3} key={service._id}>
                    <ServiceCard service={service} />
                  </Grid>
                ))}
            </Grid>
            <Typography variant="h4" className={classes.header}>Wax</Typography>
            <Grid container spacing={3} className={classes.container}>
              {!wax.length ? null
                : wax.map((service) => (
                  <Grid item xs={12} sm={6} md={3}>
                    <ServiceCard service={service} />
                  </Grid>
                ))}
            </Grid>
            <Typography variant="h4" className={classes.header}>Hair Cuts</Typography>
            <Grid container spacing={3} className={classes.container}>
              {!cuts.length ? null
                : cuts.map((service) => (
                  <Grid item xs={12} sm={6} md={3}>
                    <ServiceCard service={service} />
                  </Grid>
                ))}
            </Grid>
            <Typography variant="h4" className={classes.header}>Hair Dyes</Typography>
            <Grid container spacing={3} className={classes.container}>
              {!dyes.length ? null
                : dyes.map((service) => (
                  <Grid item xs={12} sm={6} md={3}>
                    <ServiceCard service={service} />
                  </Grid>
                ))}
            </Grid>
            <Typography variant="h4" className={classes.header}>Hair Treatment</Typography>
            <Grid container spacing={3} className={classes.container}>
              {!treatments.length ? null
                : treatments.map((service) => (
                  <Grid item xs={12} sm={6} md={3}>
                    <ServiceCard service={service} />
                  </Grid>
                ))}
            </Grid>
            <Typography variant="h4" className={classes.header}>Hair Wash/Dry</Typography>
            <Grid container spacing={3} className={classes.container}>
              {!washes.length ? null
                : washes.map((service) => (
                  <Grid item xs={12} sm={6} md={3}>
                    <ServiceCard service={service} />
                  </Grid>
                ))}
            </Grid>
            <Typography variant="h4" className={classes.header}>Hair Styling</Typography>
            <Grid container spacing={3} className={classes.container}>
              {!stylings.length ? null
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
