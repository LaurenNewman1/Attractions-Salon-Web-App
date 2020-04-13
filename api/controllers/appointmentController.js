import format from 'date-fns/format';
import Appointment from '../model/appointment';
import Service from '../model/service';
import User from '../model/user';
import { SendTextEmail, SendRequestEmail, SendConfirmationEmail } from '../lib/mail';

export const read = async (req, res) => {
  // Find Appointment from Database and return
  try {
    const data = await Appointment.find(req.params).exec();
    if (!data || data.length == 0) {
      res.status(404).type('json').send({ error: 'Appointments not found!' });
    } else {
      res.status(200).type('json').send(data);
    }
  } catch (err) {
    res.status(400).type('json').send(err);
  }
};

export const readall = async (req, res) => {
  // Find All Appointments from Database and return
  try {
    const data = await Appointment.find({});
    res.status(200).send(data);
  } catch (err) {
    res.status(400).type('json').send(err);
  }
};

export const remove = async (req, res) => {
  // Find Appointment from Database and remove
  try {
    let data = await Appointment.deleteOne({ _id: req.params.someId });
    if (data.n !== 1) {
      data = { error: 'Appointment not found!' };
      res.status(404).send(data);
    } else {
      data = { error: 'Appointment deleted' };
      res.status(200).send(data);
    }
  } catch (err) {
    res.status(400).type('json').send(err);
  }
};


export const update = async (req, res) => {
  try {
    const params = req.body;
    const dateTime = new Date(params.time);
    const updateParams = { ...params, time: dateTime };
    const appointment = await Appointment.findByIdAndUpdate(req.params.someId, updateParams).exec();
    const serviceData = await Service.find(appointment.service);

    if (appointment) {
      if (updateParams.confirmed) {
        await SendConfirmationEmail(appointment.email, appointment.email, appointment.name, appointment.notes,
          appointment.timeOrdered, appointment.addons, appointment.phone_number, serviceData[0].name, serviceData[0].price, serviceData[0].description);
      }
      res.status(200).type('json').send(appointment);
    } else {
      res.status(404).type('json').send({ error: 'Appointment not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).type('json').send(err);
  }
};


export const create = async (req, res) => {
  try {
    const params = req.body;
    const dateTime = new Date(params.time);
    const finalParams = { ...params, time: dateTime };
    const appointment = await Appointment.create(finalParams);
    // const service = await fetch(`/api/services/${appointment.service}`)
    const serviceData = await Service.find(appointment.service);
    console.log(serviceData[0].name, serviceData[0].price, serviceData[0].description);
    // await SendTextEmail(appointment.email, 'Your Booking has been Submitted', `Appointment Requested!!!!! \n \n \n \n Hi ${appointment.name}, Attractions Salon will review your appointment
    // and notify you when your appointment has been confirmed. Have any questions? Call us at (012)-345-6789. Time Requested: ${appointment.time}
    // Service: ${appointment.service.name} Specialist: ${appointment.specialist.name} Notes: ${appointment.notes}`);
    await SendTextEmail(appointment.email, appointment.email, appointment.name, appointment.notes, appointment.timeOrdered, appointment.addons, appointment.phone_number, serviceData[0].name, serviceData[0].description, serviceData[0].price);
    await SendRequestEmail(appointment.email, appointment.email, appointment.name, appointment.notes,
      appointment.timeOrdered, appointment.addons, appointment.phone_number, serviceData[0].name, serviceData[0].price, serviceData[0].description);
    const owner = await User.findOne({ role: 2 }).exec();
    if (owner) {
      await SendRequestEmail('ocvrsbytolmqsrdsgi@ttirv.net', appointment.email, appointment.name, appointment.notes,
        appointment.timeOrdered, appointment.addons, appointment.phone_number, serviceData[0].name, serviceData[0].price);
      // await SendRequestEmail(owner.email, 'A Booking has been Submitted', `Hi ${owner.name}, ${appointment.name} has submitted a booking request for review.`);
    }
    res.status(200).type('json').send(appointment);
  } catch (err) {
    res.status(403).type('json').send(err);
  }
};
