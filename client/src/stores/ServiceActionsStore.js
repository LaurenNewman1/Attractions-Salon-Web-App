/* eslint-disable max-len */
import { useState, useEffect } from 'react';

const requestRegister = async (name, type, subtype, price, time, description, banner, addons) => {
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

// export default () => {
//   const [serviceData, setServiceData] = useState({});
export const changeService = async (_id, params) => {
  const result = await requestServiceChange(_id, params);

  if (result[0] === true) {
    // it worked
    // setServiceData({
    //   serviceData,
    //   ...params,
    // });
    console.log('id', _id);
    console.log('params', params);
  }
};
//     return result;
//   };

// eslint-disable-next-line max-len
export const deleteService = async (_id) => requestDelete(_id);
// eslint-disable-next-line max-len
// export const addService = async (name, type, subtype, price, time, description, banner, addons) => requestRegister(name, type, subtype, price, time, description, banner, addons);
//   return [changeService, deleteService, addService];
// };

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
    // reviewer: '',
    // rating: 5,
    // review: '',
    name: '',
    type: '',
    subtype: '',
    time: Number,
    price: Number,
    description: '',
    banner: '',
    addons: [{
      name: '',
      price: Number,
    }],
  });

  const updateNewService = (...argus) => {
    const newFields = { ...newService };
    argus.forEach((argu) => {
      const [fieldName, val] = argu;
      // console.log(fieldName, val);
      if (fieldName === ('time') || fieldName === ('price')) {
        const num = Number(val);
        // console.log(typeof (num));
        newFields[fieldName] = num;
      } else {
        newFields[fieldName] = val;
        // console.log(typeof (val));
      }
    });
    setNewService(newFields);
  };

  const deleteReview = async (asdf, group, _id) => {
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

  const addReview = async () => {
    setLoading(true);
    // eslint-disable-next-line max-len
    const [success, rev] = await requestRegister(newService.name, newService.type, newService.subtype, newService.time,
      newService.price, newService.description, newService.banner, newService.addon);
    console.log('add review', success);
    if (success) {
      const allReviews = [...services];
      allReviews.push(rev);
      if (newService.subtype === 'cut') {
        setService(allReviews);
      } else if (newService.subtype === 'dye') {
        setService2(allReviews);
      } else if (newService.subtype === 'treatment') {
        setService3(allReviews);
      } else if (newService.subtype === 'wash') {
        setService4(allReviews);
      } else if (newService.subtype === 'styling') {
        setService5(allReviews);
      } else if (newService.subtype === 'extension') {
        setService6(allReviews);
      } else if (newService.subtype === 'full set') {
        setService7(allReviews);
      } else if (newService.subtype === 'fills') {
        setService8(allReviews);
      } else if (newService.subtype === 'manicure') {
        setService9(allReviews);
      } else if (newService.subtype === 'pedicure') {
        setService10(allReviews);
      } else if (newService.subtype === '') {
        setService11(allReviews);
      }
    }
    // updateNewService(['name', 'test'], ['type', ''], ['subtype', ''], ['time', ''], ['price', ''], ['description', ''], ['banner', ''], ['addons', []]);
    setLoading(false);
    return success;
  };

  const saveReview = async (group, index) => {
    setLoading(true);
    // eslint-disable-next-line no-unused-vars
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

  const updateReviews = (group, index, ...argus) => {
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
    const callReviews = async () => {
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
      callReviews();
    }
  }, []);

  return [services, services2, services3, services4, services5,
    services6, services7, services8, services9, services10, services11,
    newService, loading, updateReviews,
    updateNewService, deleteReview, addReview, saveReview];
};
