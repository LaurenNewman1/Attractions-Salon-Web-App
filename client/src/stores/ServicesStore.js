
const fetchServicesByType = async (type) => {
  let ret;
  switch (type) {
    case 'nails':
      ret = await fetch('/api/services/types/nail')
        .then((response) => response.json())
        .then((data) => data);
      return ret;
    case 'wax':
      ret = await fetch('/api/services/types/wax')
        .then((response) => response.json())
        .then((data) => data);
      return ret;
    case 'cuts':
      ret = await fetch('/api/services/types/hair/cut')
        .then((response) => response.json())
        .then((data) => data);
      return ret;
    case 'dyes':
      ret = await fetch('/api/services/types/hair/dye')
        .then((response) => response.json())
        .then((data) => data);
      return ret;
    case 'treatments':
      ret = await fetch('/api/services/types/hair/treatment')
        .then((response) => response.json())
        .then((data) => data);
      return ret;
    case 'washes':
      ret = await fetch('/api/services/types/hair/wash')
        .then((response) => response.json())
        .then((data) => data);
      return ret;
    case 'stylings':
      ret = await fetch('/api/services/types/hair/styling')
        .then((response) => response.json())
        .then((data) => data);
      return ret;
    case 'extensions':
      ret = await fetch('/api/services/types/hair/extension')
        .then((response) => response.json())
        .then((data) => data);
      return ret;
    default:
      return [];
  }
};

export default fetchServicesByType;

const requestRegister = async (name, type, subType, price, time, description, banner) => {
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
        name, type, subType, price, time, description, banner,
      }),
    });

  return [res.status === 200, await res.json()];
};


// eslint-disable-next-line max-len
export const addService = async (name, type, subType, price, time, description, banner) => requestRegister(name, type, subType, price, time, description, banner);
