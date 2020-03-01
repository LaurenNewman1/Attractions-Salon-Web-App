import mongoose from 'mongoose';
import Service from '../model/service.js';

export const read = (req, res) => {
//Find A servicefrom Database and return
    Service.findById(req.params.someId, (err, data) => {
        if(err){
            console.log(err);
        }
        else if(data == null){
            data = {error: 'Service not found!'};
            res.send(data);
        }
        else{
            res.send(data);
        }
    });
};
export const readall = (req, res) => {
//Find All Services from Database and return
    Service.findById({}, (err, data) => {
        if(err){
            console.log(err);
        }
        else if(data == null){
            data = {error: 'No services found!'};
            res.send(data);
        }
        else{
            res.send(data);
        }
    });
};