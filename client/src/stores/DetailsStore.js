const loadServiceOptions = async (type) => {
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
    case 'hair':
      ret = await fetch('/api/services/types/hair')
        .then((response) => response.json())
        .then((data) => data);
      return ret;
    default:
      return [];
  }
};

export default loadServiceOptions;
