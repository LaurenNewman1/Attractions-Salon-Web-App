import moment from 'moment';
import { useState, useEffect } from 'react';

const now = new Date();
const MOCK_BOOK_REQUEST_REQUEST = [
  {
    name: 'Jane Doe',
    dateOrdered: now.toISOString(),
    appointmentDatetime: now.toISOString(),
    services: [
      '5e6ad904eca0accd655e5fc3',
      '5e6ad904eca0accd655e5fcd',
      '5e6ad904eca0accd655e5fd4',
    ],
    specialist: null,
    confirmed: false,
    notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse aliquam euismod fringilla. Phasellus ultrices dapibus.',
  },
];

export default () => {
  const [requests, setRequests] = useState([]);
  const [usedServices, setUsedServices] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchServiceDetails = async (serviceCache, serviceID) => {
    if (serviceCache[serviceID]) return serviceCache;

    const res = await fetch(`/api/services/${serviceID}`);
    if (res.status === 404) {
      return serviceCache;
    }

    const result = res.json();
    return { ...serviceCache, serviceID: result };
  };

  useEffect(() => {
    const callRequests = async () => {
      let tempSeviceCache = usedServices;

      //const bookRequestFetch = 
      const bookRequestJson = MOCK_BOOK_REQUEST_REQUEST;

      const stateArray = bookRequestJson.map((request) => {
        request.services.forEach(async (service) => {
          tempSeviceCache = await fetchServiceDetails(tempSeviceCache, service);
        });

        return {
          ...request,
          dateOrdered: moment(request.dateOrdered),
          appointmentDatetime: moment(request.appointmentDatetime),
        };
      });

      setRequests(stateArray);
      setUsedServices(tempSeviceCache);
      setLoading(false);
    };

    if (loading) {
      callRequests();
    }
  }, []);

  return [requests, usedServices, loading];
};
