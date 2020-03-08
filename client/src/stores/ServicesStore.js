const fetchServicesByType = async (type) => {
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
    case 'cuts':
      ret = await fetch('/api/services/types/hair/cut')
        .then((response) => response.json())
        .then((data) => data);
      return ret;
    case 'dyes':
      ret = await fetch('/api/services/types/hair/dye')
        .then((response) => response.json())
        .then((data) => data);
      return ret;
    case 'treatments':
      ret = await fetch('/api/services/types/hair/treatment')
        .then((response) => response.json())
        .then((data) => data);
      return ret;
    case 'washes':
      ret = await fetch('/api/services/types/hair/wash')
        .then((response) => response.json())
        .then((data) => data);
      return ret;
    case 'stylings':
      ret = await fetch('/api/services/types/hair/styling')
        .then((response) => response.json())
        .then((data) => data);
      return ret;
    case 'extensions':
      ret = await fetch('/api/services/types/hair/extension')
        .then((response) => response.json())
        .then((data) => data);
      return ret;
    default:
      return [];
  }
};

export default fetchServicesByType;
