import { useState, useEffect } from 'react';

const requestNewService = async (name, type, subtype, price, time, description, banner, addons) => {
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
      body: JSON.stringify({
        name, type, subtype, price, time, description, banner, addons,
      }),
    });

  return [res.status === 200, await res.json()];
};

const requestServiceChange = async (_id, params) => {
  const res = await fetch(`/api/services/${_id}`, {
    method: 'PUT',
    cache: 'no-cache',
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(params),
  });

  return [res.status === 200, await res.json()];
};

const requestDelete = async (_id) => {
  const res = await fetch(`/api/services/${_id}`, {
    method: 'DELETE',
    cache: 'no-cache',
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
  });

  return res.status === 200;
};

export default () => {
  const [services, setService] = useState([]);
  const [services2, setService2] = useState([]);
  const [services3, setService3] = useState([]);
  const [services4, setService4] = useState([]);
  const [services5, setService5] = useState([]);
  const [services6, setService6] = useState([]);
  const [services7, setService7] = useState([]);
  const [services8, setService8] = useState([]);
  const [services9, setService9] = useState([]);
  const [services10, setService10] = useState([]);
  const [services11, setService11] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newService, setNewService] = useState({
    name: '',
    type: '',
    subtype: '',
    time: '',
    price: '',
    description: '',
    banner: '',
    addons: [{
      name: '',
      price: '',
    }],
  });

  const updateNewService = (...argus) => {
    const newFields = { ...newService };
    argus.forEach((argu) => {
      const [fieldName, val] = argu;
      if (fieldName === ('time') || fieldName === ('price')) {
        const num = Number(val);
        newFields[fieldName] = num;
      } else {
        newFields[fieldName] = val;
      }
    });
    setNewService(newFields);
  };

  const deleteService = async (asdf, group, _id) => {
    setLoading(true);
    const success = await requestDelete(_id);
    if (success) {
      const allServices = [...group];
      allServices.splice(group.findIndex((r) => r._id === _id), 1);
      if (asdf === 'services') {
        setService(allServices);
      } else if (asdf === 'services2') {
        setService2(allServices);
      } else if (asdf === 'services3') {
        setService3(allServices);
      } else if (asdf === 'services4') {
        setService4(allServices);
      } else if (asdf === 'services5') {
        setService5(allServices);
      } else if (asdf === 'services6') {
        setService6(allServices);
      } else if (asdf === 'services7') {
        setService7(allServices);
      } else if (asdf === 'services8') {
        setService8(allServices);
      } else if (asdf === 'services9') {
        setService9(allServices);
      } else if (asdf === 'services10') {
        setService10(allServices);
      } else if (asdf === 'services11') {
        setService11(allServices);
      }
    }
    updateNewService(['name', ''], ['type', ''], ['subtype', ''], ['time', ''], ['price', ''], ['description', ''], ['banner', ''], ['addons', []]);
    setLoading(false);
    return success;
  };

  const addService = async () => {
    setLoading(true);
    const [success, rev] = await requestNewService(newService.name, newService.type,
      newService.subtype, newService.time,
      newService.price, newService.description, newService.banner, newService.addon);

    if (success) {
      const allServices = [...services];
      allServices.push(rev);
      if (newService.subtype === 'cut') {
        setService(allServices);
      } else if (newService.subtype === 'dye') {
        setService2(allServices);
      } else if (newService.subtype === 'treatment') {
        setService3(allServices);
      } else if (newService.subtype === 'wash') {
        setService4(allServices);
      } else if (newService.subtype === 'styling') {
        setService5(allServices);
      } else if (newService.subtype === 'extension') {
        setService6(allServices);
      } else if (newService.subtype === 'full set') {
        setService7(allServices);
      } else if (newService.subtype === 'fills') {
        setService8(allServices);
      } else if (newService.subtype === 'manicure') {
        setService9(allServices);
      } else if (newService.subtype === 'pedicure') {
        setService10(allServices);
      } else if (newService.subtype === '') {
        setService11(allServices);
      }
    }
    setLoading(false);
    return success;
  };

  const saveService = async (group, index) => {
    setLoading(true);
    const [success, rev] = await requestServiceChange(group[index]._id, {
      name: group[index].name,
      type: group[index].type,
      subtype: group[index].subtype,
      time: group[index].time,
      price: group[index].price,
      description: group[index].description,
      banner: group[index].banner,
      addons: group[index].addons,
    });
    setLoading(false);
    return success;
  };

  const updateServices = (group, index, ...argus) => {
    const allServices = [...group];
    const newFields = allServices[index];
    argus.forEach((argu) => {
      const [fieldName, val] = argu;
      newFields[fieldName] = val;
    });
    allServices[index] = newFields;
    setService(allServices);
  };

  useEffect(() => {
    const callServices = async () => {
      const fetchServicesByType = async (type, subtype) => fetch(`/api/services/types/${type}/${subtype}`)
        .then((response) => response.json())
        .then((data) => data);

      setService(await fetchServicesByType('hair', 'cut'));
      setService2(await fetchServicesByType('hair', 'dye'));
      setService3(await fetchServicesByType('hair', 'treatment'));
      setService4(await fetchServicesByType('hair', 'wash'));
      setService5(await fetchServicesByType('hair', 'styling'));
      setService6(await fetchServicesByType('hair', 'extension'));
      setService7(await fetchServicesByType('nails', 'full set'));
      setService8(await fetchServicesByType('nails', 'fills'));
      setService9(await fetchServicesByType('nails', 'manicure'));
      setService10(await fetchServicesByType('nails', 'pedicure'));
      setService11(await fetchServicesByType('wax', ''));
      setLoading(false);
    };

    if (loading) {
      callServices();
    }
  }, []);

  return [services, services2, services3, services4, services5,
    services6, services7, services8, services9, services10, services11,
    newService, loading, updateServices,
    updateNewService, deleteService, addService, saveService];
};
