import React from 'react';
import {
  Typography, Grid,
} from '@material-ui/core';
import Page from '../components/Page';
import useStyles from '../css/ServiceStyles';
import ServiceCard from '../components/ServiceCard';
import useServices from '../stores/ServiceActionsStore';
import Loading from '../components/Loading';

const Services = () => {
  const classes = useStyles();
  const [services, loading] = useServices();

  console.log('render');
  const serviceCategoryLUT = {
    'hair/cut': 'Hair Cuts',
    'hair/dye': 'Hair Dyes',
    'hair/treatment': 'Hair Treatment',
    'hair/wash': 'Hair Wash/Dry',
    'hair/styling': 'Hair Styling',
    'hair/extension': 'Hair Extensions',
    'nails/full set': 'Full Sets',
    'nails/fills': 'Fills',
    'nails/manicure': 'Manicures',
    'nails/pedicure': 'Pedicures',
    wax: 'Wax',
  };

  const serviceSection = (serviceTypes) => serviceTypes.map((key) => {
    const categoryServices = services[key];
    return (
      !categoryServices || !categoryServices.length ? null
        : (
          <div key={key}>
            <Typography variant="h5" className={classes.header}>{serviceCategoryLUT[key]}</Typography>
            <Grid container spacing={3}>
              {categoryServices.map((service, index) => (
                <Grid item xs={12} sm={6} md={3}>
                  <ServiceCard service={service} />
                </Grid>
              ))}
            </Grid>
          </div>
        )
    );
  });
  const serviceSections = serviceSection(Object.keys(serviceCategoryLUT));

  return (
    <Page>
      {loading ? <Loading />
        : (
          <div className={classes.root}>
            {serviceSections}
          </div>
        )}
    </Page>
  );
};

export default Services;
