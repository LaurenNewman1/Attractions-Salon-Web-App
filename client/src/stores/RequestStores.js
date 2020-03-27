import moment from 'moment';
import { useState, useEffect } from 'react';

const now = new Date();
const MOCK_BOOK_REQUEST_REQUEST = [
  {
    name: 'Jane Doe',
    dateOrdered: now.toISOString(),
    appointmentDatetime: now.toISOString(),
    service: '5e7bcddd1143b6506625e3f5',
    addons: [],
    phone_number: '0123456789',
    email: 'janedoe@gmail.com',
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
    if (serviceCache[serviceID]) return {};

    const res = await fetch(`/api/services/${serviceID}`);
    if (res.status === 404) {
      return undefined;
    }

    const result = await res.json();
    console.log(result);
    return result;
  };

  const deleteAddon = (requestIndex, addonIndex) => {
    const requestClone = [...requests];
    requestClone[requestIndex].addons.splice(addonIndex, 1);
    setRequests(requestClone);
  };

  const addAddon = (requestIndex, addonIndex) => {
    const requestClone = [...requests];
    requestClone[requestIndex].addons.push(addonIndex);
    setRequests(requestClone);
  };

  useEffect(() => {
    const tempSeviceCache = usedServices;

    const callRequests = async () => {
      // const bookRequestFetch =
      const bookRequestJson = MOCK_BOOK_REQUEST_REQUEST;

      const stateArray = await Promise.all(
        bookRequestJson.map(async (request) => {
          if (!tempSeviceCache[request.service]) {
            tempSeviceCache[request.service] = await fetchServiceDetails(
              tempSeviceCache, request.service,
            );
          }

          return {
            ...request,
            dateOrdered: moment(request.dateOrdered),
            appointmentDatetime: moment(request.appointmentDatetime),
          };
        }),
      );

      setRequests(stateArray);
      setUsedServices(tempSeviceCache);
      setLoading(false);
    };

    if (loading) {
      callRequests();
    }
  }, []);

  return [requests, usedServices, loading, addAddon, deleteAddon];
};
