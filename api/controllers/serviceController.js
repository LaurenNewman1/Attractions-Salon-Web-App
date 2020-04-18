import Service from '../model/service';
import currentUserAbilities from '../helpers/ability';
import GetLogger from '../config/logger';

const logger = GetLogger('Service Controller');

export const create = async (req, res) => {
  const ability = await currentUserAbilities(req);
  if (ability.cannot('create', 'Service')) {
    res.status(403).type('json').send({ error: 'Access Denied' });
    return;
  }
  try {
    const service = await Service.create(req.body);
    res.status(200).send(service);
  } catch (err) {
    res.status(400).type('json').send(err);
  }
};

export const update = async (req, res) => {
  const ability = await currentUserAbilities(req);
  if(ability.cannot('update', 'Service')) {
    res.status(403).type('json').send({ error: 'Access Denied' });
    return;
  }
  try {

    const service = await Service.findByIdAndUpdate(req.params._id, req.body).exec();

    if (service) {
      res.status(200).type('json').send(service);
    } else {
      res.status(404).type('json').send({ error: 'Service not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).type('json').send(err);
  }
};

export const remove = async (req, res) => {
  // Find Appointment from Database and remove
  const ability = await currentUserAbilities(req);
  if(ability.cannot('remove', 'Service')) {
    res.status(403).type('json').send({ error: 'Access Denied' });
    return;
  }
  try {
    let data = await Service.deleteOne({_id: req.params._id}).exec();
    if (data.n !== 1) {
      data = { error: 'Service not found!' };
      res.status(404).send(data);
    } else {
      data = { error: 'Service deleted' };
      res.status(200).send(data);
    }
  } catch (err) {
    res.status(400).type('json').send(err);
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

export const getTypes = async (req, res) => {
  try {
    const data = await Service.find({}).exec();
    const typeSet = new Set();
    data.forEach((service) => {
      let typeString = service.type;
      if (service.subtype) {
        typeString += `/${service.subtype}`;
      }
      typeSet.add(typeString);
    });

    const typeToSubType = {};
    typeSet.forEach((setVal) => {
      const [type, subtype] = setVal.split('/');
      if (!typeToSubType[type]) {
        typeToSubType[type] = [];
      }
      if (subtype) {
        typeToSubType[type] = [...typeToSubType[type], subtype];
      }
    });

    res.status(200).type('json').send(typeToSubType);
  } catch (err) {
    res.status(500).type('json').send(err);
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
