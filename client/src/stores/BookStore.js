import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const requestBook = async (booking) => {
  const res = await fetch('/api/appointments',
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
        booking,
      }),
    });
  return [res.status === 200, await res.json()];
};

const fetchAllServices = async () => {
  const ret = await fetch('/api/services')
    .then((response) => response.json())
    .then((data) => data);
  return ret;
};

export default () => {
  const [services, setServices] = useState([]);
  const [specialists, setSpecialists] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const sendRequest = async (booking) => {
    const [success, res] = await requestBook(booking);
    if (success) {
      history.push(`/confirmation/${res._id}`);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const allSpecialists = await fetch('/api/users/roles/1')
        .then((response) => response.json())
        .then((data) => data);

      const allServices = await fetchAllServices();

      setServices(allServices);
      setSpecialists(allSpecialists);
      setLoading(false);
    };

    if (loading) {
      getData();
    }
  }, []);

  return [loading, specialists, services, sendRequest];
};
