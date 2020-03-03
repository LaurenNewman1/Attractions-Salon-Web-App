import mongoose from 'mongoose';
import User from '../model/user.js';
import argon2 from 'argon2';

export const read = (req, res) => {
//Find User from Database and return
    User.findById(req.params.someId, (err, data) => {
        if(err){
            console.log(err);
        }
        else if(data == null){
            data = {error: 'User not found!'};
            res.send(data);
        }
        else{
            res.send(data);
        }
    });
};

export const remove = (req, res) => {
//Find User from Database and remove
    User.findByIdAndRemove(req.params.someId, (err, data) => {
        if (err) {
            console.log(err);
        }
        else if(!data) {
            data = {error: 'User not found!'};
            res.send(data);
        }
        else{
            data = {error: 'User deleted'};
            res.send(data);
        }

    });
};

export const update = (req, res) => {
    User.findById(req.params.someId, (err, data) => {
        if(err){
            res.status(404).send(err);
        }
        data.name = req.body.name;
        data.email = req.body.email;
        data.phone_number = req.body.phone_number;
        if(!req.body.password) {
            //check if inserted password is equivalent to the current password for security purposes
            const hash = await argon2.hash(req.params.inserted_password);
            const valid = await argon2.verify(hash, data.password);
            if(valid) {
                data.password = await argon2.hash(req.body.passowrd);
            }
        }
        data.role = req.body.role;
    });
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
