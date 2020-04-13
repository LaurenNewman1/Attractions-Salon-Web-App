import { useState, useEffect } from 'react';

const requestCreditCard = async (id, number, expMonth, expYear, cvc) => {
  const res = await fetch('/api/users/card/:someId', {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify({
      id, number, expMonth, expYear, cvc,
    }),
  });

  return [res.status === 200, await res.json()];
};

export default () => {
//   const [services, setServices] = useState([]);
//   const [specialists, setSpecialists] = useState([]);

  const newCardToUser = async (id, number, expMonth, expYear, cvc) => {
    const [success, res] = await requestCreditCard(id, number, expMonth, expYear, cvc);
    return [success, res];
  };

  //   useEffect(() => {
  //     const getData = async () => {
  //       const allSpecialists = await fetch('/api/users/roles/1')
  //         .then((response) => response.json())
  //         .then((data) => data);

  //       const allServices = await fetchAllServices();

  //       setServices(allServices);
  //       setSpecialists(allSpecialists);
  //       setLoading(false);
  //     };

  //     if (loading) {
  //       getData();
  //     }
  //   }, []);

  return [newCardToUser];
};
