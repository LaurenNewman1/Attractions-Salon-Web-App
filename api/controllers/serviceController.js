import mongoose from 'mongoose';
import Service from '../model/service.js';

export const read = async (req, res) => {
//Find A servicefrom Database and return
    try {
        var data = await Service.findOne({_id: req.params.someId});
        if (!data) {
            data = {error: 'Service not found!'};
            res.status(404).send(data);
        } else {
            res.status(200).send(data);
        }
    }
    catch (err) {
        res.status(400).type('json').send(err);
    }
};
export const readall = async (req, res) => {
//Find All Services from Database and return
    try {
        var data = await Service.find({});
        if (data.length == 0) {
            data = {error: 'No services found!'};
            res.status(404).send(data);
        } else {
            res.status(200).send(data);
        }
    }
    catch (err) {
        res.status(400).type('json').send(err);
    }
};