import Appointment from '../model/appointment';

export const read = async (req, res) => {
    // Find Appointment from Database and return
    try {
        const data = await Appointment.find(req.params).exec();
        if (!data || data.length == 0) {
            res.status(404).type('json').send({ error: 'Appointments not found!' });
        } else {
            res.status(200).type('json').send(data);
        }
    } catch (err) {
        res.status(400).type('json').send(err);
    }
};

export const readall = async (req, res) => {
    // Find All Appointments from Database and return
    try {
        const data = await Appointment.find({});
        res.status(200).send(data);
    } catch (err) {
        res.status(400).type('json').send(err);
    }
};

export const remove = async (req, res) => {
    // Find Appointment from Database and remove
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
    try {
        const params = req.body;
        const dateTime = new Date(params.time)
        const updateParams = {...params, time: dateTime}
        const appointment = await Appointment.findByIdAndUpdate(req.params.someId, updateParams).exec();

        if (appointment) {
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
        const dateTime = new Date(params.time)
        const finalParams = {...params, time: dateTime}
        const appointment = await Appointment.create(finalParams)
        res.status(200).type('json').send(appointment);
    } catch (err) {
        res.status(403).type('json').send(err);
    }
};
