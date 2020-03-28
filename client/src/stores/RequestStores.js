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
  const ret = await fetch('/api/services');
  return ret.json();
};

export default (unconformed = true) => {
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
  };

  useEffect(() => {
    const callRequests = async () => {
      const requestURL = unconformed ? '/api/appointments/status/false' : '/api/appointments/status/true';
      const bookRequestFetch = await fetch(requestURL)
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

  return [requests, services, specialists, loading, updateRequests];
};
