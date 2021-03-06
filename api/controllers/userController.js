import argon2 from 'argon2';
import _ from 'lodash';
import User from '../model/user';
import currentUserAbilities, { userAbilities } from '../helpers/ability';
import GetLogger from '../config/logger';
import genForgetPasswordHash from '../helpers/user';
import { SendForgetPassword } from '../lib/mail';
const Recaptcha = require('recaptcha-v2').Recaptcha;

const logger = GetLogger('User Controller');
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

export const genForgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email }).exec();
  if (user) {
    user.forget_password_id = genForgetPasswordHash();
    await user.save();
    await SendForgetPassword(user.email, user.forget_password_id);
  }

  res.sendStatus(200);
};

export const updatePassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  
  const abilities = await currentUserAbilities(req);
  if(abilities.can('reset_password', 'Self')) {
    const user = await User.findOne({ forget_password_id: token });
    if (user) {
      const hash = await argon2.hash(password);
      user.password = hash;
      user.forget_password_id = undefined;
      await user.save();
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } else {
    res.status(403).type('json').send({ error: 'Access Denied' });
  }
};

export const read = async (req, res) => {
  // Find User from Database and return
  logger.info(req.session.userID);
  if (req.session.userID) {
    const ability = await currentUserAbilities(req);
    if (ability.can('read', 'Self')) {
      const user = await User.findById(req.session.userID).exec();
      const permittedFields = User.accessibleFieldsBy(ability);
      logger.info(permittedFields);
      res.status(200).type('json').send(_.pick(user, permittedFields));
    } else {
      res.status(404).type('json').send({ error: 'User not found.' });
    }
  } else {
    res.sendStatus(403);
  }
};

export const readByRole = async (req, res) => {
  // Find User from Database by role and return
  const ability = await currentUserAbilities(req);

  try {
    let data = await User.find(req.params).exec();
    if (!data || data.length == 0) {
      res.status(404).type('json').send({ error: 'Users not found!' });
    } else {
      const permittedFields = User.accessibleFieldsBy(ability);
      logger.info(permittedFields);

      data.forEach(function(part, index){
        this[index] = _.pick(this[index], permittedFields);
      }, data);
      res.status(200).type('json').send(data);
    }
  } catch (err) {
    res.status(400).type('json').send(err);
  }
};

export const remove = async (req, res) => {
  // Find User from Database and remove
  const ability = await currentUserAbilities(req);
  if(ability.cannot('remove', 'User')) {
    res.status(403).type('json').send({ error: 'Access Denied' });
    return;
  }
  
  try {
    let data = await User.deleteOne({ _id: req.params.someId });
    if (data.n !== 1) {
      data = { error: 'User not found!' };
      res.status(404).send(data);
    } else {
      data = { error: 'User deleted' };
      res.status(200).send(data);
    }
  } catch (err) {
    res.status(400).type('json').send(err);
  }
};


export const update = async (req, res) => {
  try {
    const { insertedPassword, ...params } = req.body;
    const { someId } = req.params;
    const userFind = await User.findById(someId).exec();

    if (!userFind) {
      res.status(404).type('json').send({ error: 'User not found' });
      return;
    }

    const ability = userAbilities(userFind);

    if (ability.cannot('update', userFind)) {
      res.status(403).type('json').send({ error: 'Access Denied' });
      return;
    }

    if (params.password && !insertedPassword) {
      res.status(403).type('json').send({ error: 'Attempted to change password, but got old password incorrect.' });
      return;
    }

    if (insertedPassword) {
      if (!(await argon2.verify(userFind.password, insertedPassword))) {
        res.status(403).type('json').send({ error: 'Attempted to change password, but got old password incorrect.' });
        return;
      }
    }

    const user = await User.findByIdAndUpdate(someId, params).exec();

    if (user) {
      res.status(200).type('json').send(user);
    } else {
      res.status(404).type('json').send({ error: 'User not found' });
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
        const hash = await argon2.hash(params.password);
        const customer = await stripe.customers.create();
        const ability = await currentUserAbilities(req);
        const isAdmin = ability.can('manage', 'User');
        const finalUser = isAdmin
          ? { ...params, password: hash, customer_id: customer.id }
          : {
            ...params,
            password: hash,
            role: 0,
            customer_id: customer.id,
          };
        const user = await User.create(finalUser);
        res.status(200).type('json').send(user);
      } else {
        res.status(403).type('json').send({ error: 'Captcha not verified' });
      }
    });
  } catch (err) {
    res.status(403).type('json').send(err);
  }
};

export const createCard = async (req, res) => {
  try {
    const params = req.body;
    const card = await stripe.paymentMethods.create(
      {
        type: 'card',
        card: params,
      },
    );

    if (req.params.someId !== undefined) {
      const { someId } = req.params;
      const user = await User.findById(someId).exec();

      if (!user) {
        res.status(404).type('json').send({ error: 'User not found' });
      } else {
        await stripe.paymentMethods.attach(card.id, { customer: user.customer_id });
        res.status(200).type('json').send(card);
      }
    } else {
      res.status(200).type('json').send(card);
    }
  } catch (err) {
    res.status(403).type('json').send(err);
  }
};

export const getCards = async (req, res) => {
  try {
    const { someId } = req.params;
    const user = await User.findById(someId).exec();

    if (!user) {
      res.status(404).type('json').send({ error: 'User not found' });
    } else {
      const methods = await stripe.paymentMethods.list({ customer: user.customer_id, type: 'card' });

      res.status(200).type('json').send(methods);
    }
  } catch (err) {
    res.status(403).type('json').send(err);
  }
};

export const getCard = async (req, res) => {
  try {
    const card = await stripe.paymentMethods.retrieve(req.params.cardId);

    if (!card) {
      res.status(404).type('json').send({ error: 'Card not found' });
    } else {
      res.status(200).type('json').send(card);
    }
  } catch (err) {
    res.status(403).type('json').send(err);
  }
};

export const removeCard = async (req, res) => {
  try {
    const card = await stripe.paymentMethods.detach(req.params.cardId);

    if (!card) {
      res.status(404).type('json').send({ error: 'Card not found' });
    } else {
      res.status(200).type('json').send(card);
    }
  } catch (err) {
    res.status(403).type('json').send(err);
  }
};

export const updateCard = async (req, res) => {
  try {
    const user = await User.findById(req.params.someId).exec();

    if (!user) {
      res.status(404).type('json').send({ error: 'User not found' });
    } else {
      const params = req.body;
      const newCard = await stripe.paymentMethods.create(
        {
          type: 'card',
          card: params,
        },
      );

      if (!newCard) {
        res.status(404).type('json').send({ error: 'Card not valid' });
      } else {
        await stripe.paymentMethods.detach(req.params.cardId);
        await stripe.paymentMethods.attach(newCard.id, { customer: user.customer_id });

        res.status(200).type('json').send(newCard);
      }
    }
  } catch (err) {
    res.status(403).type('json').send(err);
  }
};
