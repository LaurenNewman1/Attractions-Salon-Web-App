import Service from '../../model/service';

export const serviceParams = {
  name: 'test',
  description: 'description',
  banner: '/random/path.jpg',
  type: 'hair',
  subtype: 'dyes',
  price: '9.99',
};

export const MakeService = async () => {
  const service = await Service.create(serviceParams);
  return service;
};
