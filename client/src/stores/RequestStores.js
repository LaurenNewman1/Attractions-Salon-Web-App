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
    specialist: '5e7bcddd1143b6506625e3e1',
    confirmed: false,
    notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse aliquam euismod fringilla. Phasellus ultrices dapibus.',
  },
];

const MOCK_SPECIALISTS = [
  {
    _id: '5e7bcddd1143b6506625e3e1',
    name: 'Brandi',
    services: [
      '5e7bcddd1143b6506625e3f5',
    ],
  },
  {
    _id: '5e7bcddd1143b6506625e3f0',
    name: 'Emily',
    services: [
      '5e7bcddd1143b6506625e3f5',
    ],
  },
];

const fetchAllServices = async () => {
  const ret = await fetch('/api/services')
    .then((response) => response.json())
    .then((data) => data);
  return ret;
};

export default () => {
  const [requests, setRequests] = useState([]);
  // const [usedService, setUsedService] = useState({});
  const [services, setServices] = useState([]);
  const [specialists, setSpecialists] = useState([]);
  const [loading, setLoading] = useState(true);

  // const fetchServiceDetails = async (serviceCache, serviceID) => {
  //   if (serviceCache[serviceID]) return {};

  //   const res = await fetch(`/api/services/${serviceID}`);
  //   if (res.status === 404) {
  //     return undefined;
  //   }

  //   const result = await res.json();
  //   console.log(result);
  //   return result;
  // };

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

  // const deleteAddon = (requestIndex, addonIndex) => {
  //   const requestClone = [...requests];
  //   requestClone[requestIndex].addons.splice(addonIndex, 1);
  //   setRequests(requestClone);
  // };

  // const addAddon = (requestIndex, addonIndex) => {
  //   const requestClone = [...requests];
  //   requestClone[requestIndex].addons.push(addonIndex);
  //   setRequests(requestClone);
  // };

  useEffect(() => {
    // const tempSeviceCache = usedService;

    const callRequests = async () => {
      const bookRequestFetch = await fetch('/api/appointments/status/false')
        .then((response) => response.json())
        .then((data) => data);
      // const bookRequestJson = MOCK_BOOK_REQUEST_REQUEST;

      const stateArray = await Promise.all(
        bookRequestFetch.map(async (request) =>
        // if (!tempSeviceCache[request.service]) {
        //   tempSeviceCache[request.service] = await fetchServiceDetails(
        //     tempSeviceCache, request.service,
        //   );
        // }

          ({
            ...request,
            dateOrdered: moment(request.dateOrdered),
            appointmentDatetime: moment(request.appointmentDatetime),
          })),
      );
      const allSpecialists = MOCK_SPECIALISTS;
      const allServices = await fetchAllServices();

      setRequests(stateArray);
      // setUsedService(tempSeviceCache);
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
