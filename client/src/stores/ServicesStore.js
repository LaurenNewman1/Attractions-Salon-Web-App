const fetchServicesByType = async (type, subType) => fetch(`/api/services/types/${type}/${subType}`)
  .then((response) => response.json())
  .then((data) => data);

export default fetchServicesByType;
