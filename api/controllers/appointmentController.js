import format from 'date-fns/format';
import Appointment from '../model/appointment';
import Service from '../model/service';
import User from '../model/user';
import { SendTextEmail, SendRequestEmail, SendConfirmationEmail } from '../lib/mail';
import currentUserAbilities, { userAbilities } from '../helpers/ability';
const Recaptcha = require('recaptcha-v2').Recaptcha;

const stripe = require('stripe')(process.env.STRIPE_API_KEY);

export const read = async (req, res) => {
  // Find Appointment from Database and return
  try {
    const ability = await currentUserAbilities(req);
    if(ability.can('read', 'Appointment')) {
      const data = await Appointment.find(req.params).exec();
      if (!data || data.length == 0) {
        res.status(404).type('json').send({ error: 'Appointments not found!' });
      } else {
        res.status(200).type('json').send(data);
      }
    } else {
      res.status(403).type('json').send({ error: 'Access Denied' });
    }
  } catch (err) {
    res.status(400).type('json').send(err);
  }
};

export const readall = async (req, res) => {
  // Find All Appointments from Database and return
  try {
    const ability = await currentUserAbilities(req);
    if(ability.can('read', 'Appointment')) {
      const data = await Appointment.find({});
      res.status(200).send(data);
    } else {
      res.status(403).type('json').send({ error: 'Access Denied' });
    }
  } catch (err) {
    res.status(400).type('json').send(err);
  }
};

export const remove = async (req, res) => {
  // Find Appointment from Database and remove
  const ability = await currentUserAbilities(req);
  if(ability.cannot('remove', 'Appointment')) {
    res.status(403).type('json').send({ error: 'Access Denied' });
    return;
  }

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
  const ability = await currentUserAbilities(req);
  if (ability.cannot('update', 'Appointment')) {
    res.status(403).type('json').send({ error: 'Access Denied' });
    return;
  }

  try {
    const params = req.body;
    const dateTime = new Date(params.time);
    const updateParams = { ...params, time: dateTime };
    const appointment = await Appointment.findByIdAndUpdate(req.params.someId, updateParams).exec();
    const serviceData = await Service.find(appointment.service);

    if (appointment) {
      if (updateParams.confirmed) {
        if (!(appointment.payInStore)) {
          const intent = await stripe.paymentIntents.confirm(appointment.intent_id);

          if (intent.status != 'succeeded') {
            await Appointment.findByIdAndUpdate(req.params.someId, { confirmed: false }).exec();
            res.status(400).type('json').send({ error: 'Payment Failed' });
            return;
          }
        }
        await SendConfirmationEmail(appointment.email, 'attractions-salon@attractionssalon.com', appointment.name, appointment.notes,
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
    const data = {
      remoteip: req.connection,
      response: params.captchaResponse,
      secret: process.env.RECAPTCHA_SECRET_KEY,
    };

    const recaptcha = new Recaptcha(
      process.env.RECAPTCHA_SITE_KEY,
      process.env.RECAPTCHA_SECRET_KEY,
      data,
    );

    recaptcha.verify(async (success) => {
      if (success || process.env.NODE_ENV === 'test') {
        const dateTime = new Date(params.time);
        const finalParams = { ...params, time: dateTime };
        const appointment = await Appointment.create(finalParams);
        const serviceData = await Service.find(appointment.service);
        await SendTextEmail(appointment.email, 'attractions-salon@attractionssalon.com', appointment.name, appointment.notes, appointment.timeOrdered, appointment.addons, appointment.phone_number, serviceData[0].name, serviceData[0].description, serviceData[0].price);
        const owner = await User.findOne({ role: 2 }).exec();
        if (owner) {
          await SendRequestEmail(owner.email, 'attractions-salon@attractionssalon.com', appointment.name, appointment.notes,
            appointment.timeOrdered, appointment.addons, appointment.phone_number, serviceData[0].name, serviceData[0].price, serviceData[0].description);
          // await SendRequestEmail(owner.email, 'A Booking has been Submitted', `Hi ${owner.name}, ${appointment.name} has submitted a booking request for review.`);
        }
        if (!params.payInStore) {
          const user = await User.findOne({email: params.email}).exec();
          const intent = await stripe.paymentIntents.create(
            {
              amount: params.amount,
              currency: params.currency,
              customer: user.customer_id,
              payment_method: params.method_id,
            },
          );

          // eslint-disable-next-line max-len
          const appointmentNew = await Appointment.findByIdAndUpdate(appointment._id, { intent_id: intent.id });
          res.status(200).type('json').send(appointmentNew);
        } else {
          res.status(200).type('json').send(appointment);
        }
      } else {
        res.status(403).type('json').send({ error: 'Captcha not verified' });
      }
    });
  } catch (err) {
    res.status(403).type('json').send(err);
  }
};
