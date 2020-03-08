const fetchServicesByType = async (type) => {
  const testData = [{
    name: 'Single process color',
    description: 'Single process color',
    price: 55.0,
    time: 30.0,
    banner: 'NEED_IMAGE',
    type: 'hair',
    subtype: 'dye',
    addons: [
      {
        name: 'Cut',
        price: 15.0,
      },
    ],
  },
  {
    name: 'Single process color',
    description: 'Single process color',
    price: 55.0,
    time: 30.0,
    banner: 'NEED_IMAGE',
    type: 'hair',
    subtype: 'dye',
    addons: [
      {
        name: 'Cut',
        price: 15.0,
      },
    ],
  },
  {
    name: 'Single process color',
    description: 'Single process color',
    price: 55.0,
    time: 30.0,
    banner: 'NEED_IMAGE',
    type: 'hair',
    subtype: 'dye',
    addons: [
      {
        name: 'Cut',
        price: 15.0,
      },
    ],
  },
  {
    name: 'Single process color',
    description: 'Single process color',
    price: 55.0,
    time: 30.0,
    banner: 'NEED_IMAGE',
    type: 'hair',
    subtype: 'dye',
    addons: [
      {
        name: 'Cut',
        price: 15.0,
      },
    ],
  },
  ];
  let ret;
  switch (type) {
    case 'nails':
      return testData;
    case 'wax':
      return testData;
    case 'cuts':
      return testData;
    case 'dyes':
      ret = await fetch('/api/services/types/hair/dye')
        .then((response) => response.json())
        .then((data) => data);
      return ret;
    case 'treatments':
      return testData;
    case 'washes':
      return testData;
    case 'stylings':
      return testData;
    default:
      return [];
  }
};

export default fetchServicesByType;
