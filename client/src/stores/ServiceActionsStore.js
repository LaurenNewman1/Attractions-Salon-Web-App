/* eslint-disable max-len */
import { useState, useEffect } from 'react';

const requestNewService = async (service) => {
  const res = await fetch('/api/services',
    {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(service),
    });

  return [res.status === 200, await res.json()];
};

const requestServiceChange = async (service) => {
  const res = await fetch(`/api/services/${service._id}`, {
    method: 'PUT',
    cache: 'no-cache',
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(service),
  });

  return [res.status === 200, await res.json()];
};

const requestDelete = async ({ _id }) => {
  const res = await fetch(`/api/services/${_id}`, {
    method: 'DELETE',
    cache: 'no-cache',
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
  });

  return res.status === 200;
};


const assembleTypeKey = (type, subtype) => `${type}${subtype ? `/${subtype}` : ''}`;

export default () => {
  const [services, setService] = useState({});
  const [types, setTypes] = useState({});
  const [init, setInit] = useState(true);
  const [loading, setLoading] = useState(true);

  const deleteService = async (service) => {
    setLoading(true);
    const success = await requestDelete(service);
    if (success) {
      const updatedServices = { ...services };
      const { _id, type, subtype } = service;
      const index = updatedServices[assembleTypeKey(type, subtype)].findIndex((s) => s._id === _id);
      updatedServices[assembleTypeKey(type, subtype)].splice(index, 1);
      setService(updatedServices);
    }
    setLoading(false);
    return success;
  };

  const deleteAddon = async (service, addonIndex) => {
    setLoading(true);
    const allServices = { ...services };
    const { _id, type, subtype } = service;
    allServices[assembleTypeKey(type, subtype)].find((s) => s._id === _id).addons.splice(addonIndex, 1);
    const revisedService = allServices[assembleTypeKey(type, subtype)].find((s) => s._id === _id);
    const [success] = await requestServiceChange(revisedService);
    if (success) {
      setService(allServices);
    }
    setLoading(false);
    return success;
  };

  const addService = async (service) => {
    setLoading(true);
    const [success, ser] = await requestNewService(service);
    if (success) {
      const updatedService = { ...services };
      const { type, subtype } = service;
      updatedService[assembleTypeKey(type, subtype)].push(ser);
      setService(updatedService);
    }
    setLoading(false);
    return success;
  };

  const modifyService = async (service) => {
    const updatedServices = { ...services };
    const { _id, type, subtype } = service;
    const newKey = assembleTypeKey(type, subtype);
    const currIndex = updatedServices[newKey].findIndex((s) => s._id === _id);
    // if (currIndex) {
    //   updatedServices[newKey].splice(serviceIndex, 1);
    //   updatedServices[newKey].push(service);
    // } else {
    updatedServices[newKey][currIndex] = service;
    // }
    setService(updatedServices);
  };

  const updateService = async (service) => {
    setLoading(true);
    // eslint-disable-next-line no-unused-vars
    const [success, rev] = await requestServiceChange(service);
    if (success) {
      const updatedService = { ...services };
      const { _id, type, subtype } = service;
      const { _id: oldId, type: oldType, subtype: oldSubtype } = rev;
      const oldKey = assembleTypeKey(oldType, oldSubtype);
      const newKey = assembleTypeKey(type, subtype);
      const currIndex = updatedService[newKey].findIndex((s) => s._id === _id);
      if (oldKey !== newKey) {
        const indexToRemove = updatedService[assembleTypeKey(oldType, oldSubtype)].findIndex((s) => s._id === oldId);
        updatedService[assembleTypeKey(oldType, oldSubtype)].splice(indexToRemove, 1);
        updatedService[assembleTypeKey(type, subtype)].push(service);
      } else {
        updatedService[newKey][currIndex] = service;
      }
      setService(updatedService);
    }
    setLoading(false);
    return success;
  };

  useEffect(() => {
    const callServices = async () => {
      const res = await fetch('/api/services');
      const allServices = await res.json();
      const mappedServices = {};
      allServices.forEach((service) => {
        const key = assembleTypeKey(service.type, service.subtype);
        if (!mappedServices[key]) {
          mappedServices[key] = [];
        }
        mappedServices[key].push(service);
      });
      const serviceTypes = await fetch('/api/services/types')
        .then((response) => response.json())
        .then((data) => data);

      setService(mappedServices);
      setTypes(serviceTypes);
      setLoading(false);
    };

    if (init) {
      callServices();
      setInit(false);
    }
  }, [services]);

  return [services, loading, addService, modifyService, updateService,
    deleteService, deleteAddon, types];
};
