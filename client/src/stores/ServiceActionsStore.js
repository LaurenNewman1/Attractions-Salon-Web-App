// import { useState, useEffect } from 'react';

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
export const addService = async (name, type, subtype, price, time, description, banner, addons) => requestRegister(name, type, subtype, price, time, description, banner, addons);
//   return [changeService, deleteService, addService];
// };
