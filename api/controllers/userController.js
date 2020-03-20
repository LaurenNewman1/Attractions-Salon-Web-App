import argon2 from 'argon2';
import User from '../model/user';

export const read = async (req, res) => {
  // Find User from Database and return
  if (req.session.userID) {
    const user = await User.findById(req.session.userID).exec();
    if (user) {
      res.status(200).type('json').send(user);
    } else {
      res.status(404).type('json').send({ error: 'User not found.' });
    }
  } else {
    res.sendStatus(403);
  }
};

export const readByRole = async (req, res) => {
  // Find User from Database by role and return
  try {
    const data = await User.find(req.params).exec();
    if (!data || data.length == 0) {
      res.status(404).type('json').send({ error: 'Users not found!' });
    } else {
      res.status(200).type('json').send(data);
    }
  } catch (err) {
    res.status(400).type('json').send(err);
  }
};

export const remove = async (req, res) => {
  // Find User from Database and remove
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

    if (params.password && !insertedPassword) {
      res.status(403).type('json').send({ error: 'Attempted to change password, but got old password incorrect.' });
      return;
    }

    if (insertedPassword) {
      const userFind = await User.findById(someId).exec();

      if (!userFind) {
        res.status(404).type('json').send({ error: 'User not found' });
        return;
      }

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
    const hash = await argon2.hash(params.password);
    const finalUser = { ...params, password: hash, role: 0 };
    const user = await User.create(finalUser);
    res.status(200).type('json').send(user);
  } catch (err) {
    res.status(403).type('json').send(err);
  }
};
