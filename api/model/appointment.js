import mongoose, { Schema } from 'mongoose';
import User from './user'

const Appointment = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        required: true
    },
    time: {
        type: Date,
        required: true,
    },
    services: {
        type: [mongoose.Types.ObjectId],
        required: true,
    },
    specialist: {
        type: mongoose.Types.ObjectId
    },
   notes: {
        type: String
    }
});

export default mongoose.model('Appointment', Appointment);
