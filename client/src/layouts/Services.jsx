import React, { useState, useEffect } from 'react';
import {
  Typography, Grid,
} from '@material-ui/core';
import Page from '../components/Page';
import useStyles from '../css/ServiceStyles';
import ServiceCard from '../components/ServiceCard';
import fetchServicesByType from '../stores/ServicesStore';
import Loading from '../components/Loading';

const Services = () => {
  const classes = useStyles();

  const [fullSets, setFullSets] = useState([]);
  const [fills, setFills] = useState([]);
  const [manicures, setManicures] = useState([]);
  const [pedicures, setPedicures] = useState([]);

  const [wax, setWax] = useState([]);

  const [cuts, setCuts] = useState([]);
  const [dyes, setDyes] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [washes, setWashes] = useState([]);
  const [stylings, setStylings] = useState([]);
  const [extensions, setExtensions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setFullSets(await fetchServicesByType('nails', 'full set'));
      setFills(await fetchServicesByType('nails', 'fills'));
      setManicures(await fetchServicesByType('nails', 'manicure'));
      setPedicures(await fetchServicesByType('nails', 'pedicure'));
      setWax(await fetchServicesByType('wax', ''));
      setCuts(await fetchServicesByType('hair', 'cut'));
      setDyes(await fetchServicesByType('hair', 'dye'));
      setTreatments(await fetchServicesByType('hair', 'treatment'));
      setWashes(await fetchServicesByType('hair', 'wash'));
      setStylings(await fetchServicesByType('hair', 'styling'));
      setExtensions(await fetchServicesByType('hair', 'extension'));
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <Page>
      {loading ? <Loading />
        : (
          <div className={classes.root}>
            {/* Hair */}
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
            <Typography variant="h4" className={classes.header}>Hair Extensions</Typography>
            <Grid container spacing={3} className={classes.container}>
              {!extensions.length ? null
                : extensions.map((service) => (
                  <Grid item xs={12} sm={6} md={3}>
                    <ServiceCard service={service} />
                  </Grid>
                ))}
            </Grid>
            {/* Wax */}
            <Typography variant="h4" className={classes.header}>Full Sets</Typography>
            <Grid container spacing={3} className={classes.container}>
              {!fullSets.length ? null
                : fullSets.map((service) => (
                  <Grid item xs={12} sm={6} md={3} key={service._id}>
                    <ServiceCard service={service} />
                  </Grid>
                ))}
            </Grid>
            {/* Nails */}
            <Typography variant="h4" className={classes.header}>Fills</Typography>
            <Grid container spacing={3} className={classes.container}>
              {!fills.length ? null
                : fills.map((service) => (
                  <Grid item xs={12} sm={6} md={3} key={service._id}>
                    <ServiceCard service={service} />
                  </Grid>
                ))}
            </Grid>
            <Typography variant="h4" className={classes.header}>Manicures</Typography>
            <Grid container spacing={3} className={classes.container}>
              {!manicures.length ? null
                : manicures.map((service) => (
                  <Grid item xs={12} sm={6} md={3} key={service._id}>
                    <ServiceCard service={service} />
                  </Grid>
                ))}
            </Grid>
            <Typography variant="h4" className={classes.header}>Pedicures</Typography>
            <Grid container spacing={3} className={classes.container}>
              {!pedicures.length ? null
                : pedicures.map((service) => (
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
          </div>
        )}
    </Page>
  );
};

export default Services;
