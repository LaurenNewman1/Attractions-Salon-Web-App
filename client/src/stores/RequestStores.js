import { useState, useEffect } from 'react';

const MOCK_SPECIALISTS = [
  {
    _id: '5e7bcddd1143b6506625e3e2',
    name: 'Brandi',
    services: [
      '5e7bcddd1143b6506625e3e2',
    ],
  },
  {
    _id: '5e7bcddd1143b6506625e3f0',
    name: 'Emily',
    services: [
      '5e7bcddd1143b6506625e3e6',
    ],
  },
];

const fetchAllServices = async () => {
  const ret = await fetch('/api/services')
    .then((response) => response.json())
    .then((data) => data);
  return ret;
};

const requestApptUpdate = async (id, params) => {
  const res = await fetch(`/api/appointments/${id}`, {
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

  return res.status === 200;
};

const requestDelete = async (_id) => {
  const res = await fetch(`/api/appointments/${_id}`, {
    method: 'DELETE',
    cache: 'no-cache',
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
  });

  return res.status === 200;
};

export default () => {
  const [requests, setRequests] = useState([]);
  const [services, setServices] = useState([]);
  const [specialists, setSpecialists] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAddons = (index, newService) => {
    const allRequests = [...requests];
    const { addons } = allRequests[index];
    const availAddons = [...services.find((s) => s._id === newService).addons];
    addons.forEach((add, addIndex) => {
      if (!availAddons.find((a) => (a.name === add.name && a.price === add.price))) {
        allRequests[index].addons.splice(addIndex, 1);
      }
    });
    setRequests(allRequests);
  };

  const updateRequests = (index, ...argus) => {
    console.log(index, argus);
    const allRequests = [...requests];
    const newFields = allRequests[index];
    argus.forEach((argu) => {
      const [fieldName, val] = argu;
      newFields[fieldName] = val;
      if (fieldName === 'service') {
        handleAddons(index, val);
      }
    });
    allRequests[index] = newFields;
    setRequests(allRequests);
    return allRequests[index];
  };

  const confirm = async (index) => {
    setLoading(true);
    const confirmedReq = updateRequests(index, ['confirmed', true]);
    const success = requestApptUpdate(confirmedReq._id, confirmedReq);
    if (success) {
      const allRequests = [...requests];
      allRequests.splice(index, 1);
      setRequests(allRequests);
    }
    setLoading(false);
    return success;
  };

  const deleteRequest = async (index) => {
    setLoading(true);
    const deletedReq = { ...requests[index] };
    const success = await requestDelete(deletedReq._id);
    if (success) {
      const allRequests = [...requests];
      allRequests.splice(index, 1);
      setRequests(allRequests);
    }
    setLoading(false);
    return success;
  };

  useEffect(() => {
    const callRequests = async () => {
      const bookRequestFetch = await fetch('/api/appointments/status/false')
        .then((response) => response.json())
        .then((data) => data);

      const allSpecialists = MOCK_SPECIALISTS;
      const allServices = await fetchAllServices();

      console.log(bookRequestFetch);

      setRequests(bookRequestFetch);
      setServices(allServices);
      setSpecialists(allSpecialists);
      setLoading(false);
    };

    if (loading) {
      callRequests();
    }
  }, []);

  return [requests, services, specialists, loading, updateRequests, confirm, deleteRequest];
};
