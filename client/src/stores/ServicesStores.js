const fetchServicesByType = () => {
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
  }];
  return testData;
};

export default fetchServicesByType;
