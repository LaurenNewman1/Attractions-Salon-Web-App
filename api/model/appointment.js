import mongoose, { Schema } from 'mongoose';

const Appointment = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  confirmed: {
    type: Boolean,
    required: true,
  },
  timeOrdered: {
    type: Date,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  service: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  specialist: {
    type: mongoose.Types.ObjectId,
  },
  notes: {
    type: String,
  },
  addons: [
    {
      name: {
        type: String,
        required: true,
      },
      price: Number,
    },
  ],
  payInStore: {
    type: Boolean,
  },
  intent_id: {
    type: String,
  },
});

export default mongoose.model('Appointment', Appointment);
