import mongoose from 'mongoose';
import User from '../model/user.js';

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