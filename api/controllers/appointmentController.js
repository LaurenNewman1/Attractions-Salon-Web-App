import format from 'date-fns/format';
import Appointment from '../model/appointment';
import User from '../model/user';
import { SendTextEmail } from '../lib/mail';

const stripe = require('stripe')(process.env.STRIPE_API_KEY);

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

    if (appointment) {
      if (updateParams.confirmed) {
        if (!(appointment.payInStore)) {
          const intent = await stripe.paymentIntents.confirm(appointment.intent_id);

          if (intent.status != 'succeeded') {
            await Appointment.findByIdAndUpdate(req.params.someId, {confirmed: false}).exec();
            res.status(400).type('json').send({ error: 'Payment Failed' });
            return;
          }
        }
        await SendTextEmail(appointment.email, 'Your Booking has been Confirmed', `Hi ${appointment.name}, your booking with Attractions Salon has been comfirmed for ${format(appointment.time, 'MM/dd/yyyy K:mm aa')}`);
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
    const finalParams = {...params, time: dateTime};
    const appointment = await Appointment.create(finalParams);
    await SendTextEmail(appointment.email, 'Your Booking has been Submitted', `Hi ${appointment.name}, your booking has been submitted. You will get an email soon when Attractions Salon has confirmed your appointment time.`);
    const owner = await User.findOne({ role: 2 }).exec();
    if (owner) {
      await SendTextEmail(owner.email, 'A Booking has been Submitted', `Hi ${owner.name}, ${appointment.name} has submitted a booking request for review.`);
    }

    if(!params.payInStore) {
      const user = await User.findOne({email: params.email}).exec();
      if(user) {
        const intent = await stripe.paymentIntents.create(
            {
              amount: params.amount,
              currency: params.currency,
              payment_method: params.method_id,
              customer: user.customer_id,
            });
      }
      else {
        const intent = await stripe.paymentIntents.create(
            {
              amount: params.amount,
              currency: params.currency,
              payment_method: params.method_id,
            });
      }

      const appointmentNew = await Appointment.findByIdAndUpdate(appointment._id,{intent_id: intent.id});
      res.status(200).type('json').send(appointmentNew);
    }
    else {
      res.status(200).type('json').send(appointment);
    }
  } catch (err) {
    res.status(403).type('json').send(err);
  }
};
