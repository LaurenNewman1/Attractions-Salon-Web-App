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

export const remove = async (req, res) => {
//Find User from Database and remove
  try {
    var data = await User.deleteOne({_id: req.params.someId});
    if (data.n != 1) {
      data = {error: 'User not found!'};
      res.status(404).send(data);
    } else {
      data = {error: 'User deleted'};
      res.status(200).send(data);
    }
  } catch (err){
    res.status(400).type('json').send(err);
  }


};


export const update = async (req, res) => {
    try{
        const user = await User.findById(req.params.someId, async (err, data) => {
            if(err) {
                res.status(404).type('json').send(err);
            } else {
                data.name = req.body.name;
                data.email = req.body.email;
                data.phone_number = req.body.phone_number;
                data.role = req.body.role;

            if(req.body.inserted_password.length > 0) {
                    //check if inserted password is equivalent to the current password for security purposes

                    if(await argon2.verify(data.password, req.body.inserted_password)) {
                        data.password = await argon2.hash(req.body.password);
                    } else {
                        res.status(404).type('json').send(err);
                    }
                }

                data.save((err) => {
                    if(err) {
                        res.status(404).type('json').send(err);
                    }
                    res.status(200).type('json').send(data);
                });
            }
        });
    } catch(err) {
        res.status(400).type('json').send(err);
    }

    //res.sendStatus(403);

};

export const create = async (req, res) => {
  try {
    const params = req.body;
    const hash = await argon2.hash(params.password);
    const finalUser = { ...params, password: hash };
    const user = await User.create(finalUser);
    res.status(200).type('json').send(user);
  } catch (err) {
    res.status(403).type('json').send(err);
  }
};
