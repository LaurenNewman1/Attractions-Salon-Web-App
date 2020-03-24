import argon2 from 'argon2';
import User from '../model/user';

export const create = async (req, res) => {
  try {
    const params = req.body;
    const foundUser = await User.findOne({ email: params.email }).exec();
    if (!foundUser) {
      res.status(403).type('json').send({ error: 'Invalid email or password.' });
      return;
    }

    if (await argon2.verify(foundUser.password, params.password)) {
      if (!req.session.userID) {
        // eslint-disable-next-line no-underscore-dangle
        req.session.userID = foundUser._id;
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
