import React, { useState } from 'react';
import {
  Typography, Grid,
} from '@material-ui/core';
import Page from '../components/Page';
import ServiceCard from '../components/ServiceCard';
import useServices from '../stores/ServiceActionsStore';
import Loading from '../components/Loading';
import Search from '../components/Search';

const Services = () => {
  const [services, loading] = useServices();
  const [filters, setFilters] = useState([]);
  const [searchText, setSearchText] = useState('');

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

  const doDisplay = (service) => {
    const {
      name, type, subtype, price, time, description,
    } = service;
    if (name.toLowerCase().includes(searchText.toLowerCase())
      || type.toLowerCase().includes(searchText.toLowerCase())
      || (subtype && subtype.toLowerCase().includes(searchText.toLowerCase()))
      || (price && price.toString().includes(searchText))
      || (time && time.toString().includes(searchText))
      || description.toLowerCase().includes(searchText.toLowerCase())) {
      return true;
    }
    return false;
  };

  const serviceSection = (serviceTypes) => serviceTypes.map((key) => {
    const categoryServices = services[key];
    if (!filters.length || filters.find((f) => f === serviceCategoryLUT[key])) {
      return (
        !categoryServices || !categoryServices.length ? null
          : (
            <div key={key} style={{ marginBottom: 50 }}>
              <Typography variant="h4">{serviceCategoryLUT[key]}</Typography>
              <Grid container spacing={3}>
                {categoryServices.map((service) => (doDisplay(service)
                  ? (
                    <Grid item xs={12} sm={6} md={4} key={service._id}>
                      <ServiceCard service={service} />
                    </Grid>
                  )
                  : null
                ))}
              </Grid>
            </div>
          )
      );
    }
    return null;
  });
  const serviceSections = serviceSection(Object.keys(serviceCategoryLUT));

  return (
    <Page maxWidth="lg">
      {loading ? <Loading />
        : (
          <>
            <Typography
              align="center"
              display="block"
              variant="h3"
              gutterBottom
            >
              Services
            </Typography>
            <Grid container spacing={6} style={{ width: '100%', margin: 0 }}>
              <Grid item xs={12} sm={3}>
                <Search
                  filterOptions={Object.keys(serviceCategoryLUT).map(
                    (key) => serviceCategoryLUT[key],
                  )}
                  filters={filters}
                  setFilters={(filts) => setFilters(filts)}
                  searchText={searchText}
                  setSearchText={(text) => setSearchText(text)}
                />
              </Grid>
              <Grid item xs={12} sm={9}>
                {serviceSections}
              </Grid>
            </Grid>
          </>
        )}
    </Page>
  );
};

export default Services;
