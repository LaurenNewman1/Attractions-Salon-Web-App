import argon2 from 'argon2';
import User from '../model/user';
import GetLogger from '../config/logger';

const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const logger = GetLogger('Session Controller');

export const create = async (req, res) => {
  try {
    const params = req.body;
    const foundUser = await User.findOne({ email: params.email }).exec();
    if (!foundUser) {
      res.status(403).type('json').send({ error: 'Invalid email or password.' });
      return;
    }

    logger.info(foundUser.password);

    if (await argon2.verify(foundUser.password, params.password)) {

      if (!req.session.userID) {
        // eslint-disable-next-line no-underscore-dangle
        req.session.userID = foundUser._id;
        req.session.save();

        logger.info('test');
        logger.info(foundUser.customer_id);
        if (!foundUser.customer_id) {
          logger.info('Customer_ID not found, creating one...');
          const customer = await stripe.customers.create();
          foundUser.customer_id = customer.id;
          await foundUser.save();
        }
      }
      res.status(200).type('json').send(foundUser);
    } else {
      res.status(403).type('json').send({ error: 'Invalid email or password.' });
    }
  } catch (err) {
    res.status(500).type('json').send(err);
  }
};

export const destroy = async (req, res) => {
  if (req.session.userID) {
    req.session.destroy(() => res.sendStatus(200));
  } else {
    res.sendStatus(403);
  }
};
