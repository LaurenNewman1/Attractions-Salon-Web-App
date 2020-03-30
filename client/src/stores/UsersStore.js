const fetchServicesByType = async (type) => fetch(`/api/users/roles/${type}/`)
  .then((response) => response.json())
  .then((data) => data);

export default fetchServicesByType;
