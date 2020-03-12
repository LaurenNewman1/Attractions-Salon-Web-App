import mongoose, { Schema } from 'mongoose';
import User from './user'

const Appointment = new Schema({
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
