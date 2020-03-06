import Service from '../model/service';

export const create = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(200).send(service);
  } catch (err) {
    res.status(403).type('json').send(err);
  }
};

export const read = async (req, res) => {
  // Find A service from Database and return
  try {
    const data = await Service.findOne({ _id: req.params.someId }).exec();
    if (!data) {
      res.status(404).type('json').send({ error: 'Service not found!' });
    } else {
      res.status(200).type('json').send(data);
    }
  } catch (err) {
    console.log(err);
    res.status(400).type('json').send(err);
  }
};

export const readType = async (req, res) => {
  console.log("Called")
  console.log(req.params);
  // Find all services by type and subtype
  try {
    const data = await Service.find(req.params).exec();
    if (!data) {
      res.status(404).type('json').send({ error: 'Services not found!' });
    } else {
      res.status(200).type('json').send(data);
    }
  } catch (err) {
    res.status(400).type('json').send(err);
  }
};

export const readall = async (req, res) => {
  // Find All Services from Database and return
  try {
    const data = await Service.find({});
    res.status(200).send(data);
  } catch (err) {
    res.status(400).type('json').send(err);
  }
};
