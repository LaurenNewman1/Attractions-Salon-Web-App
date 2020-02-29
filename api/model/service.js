import mongoose, { Schema } from 'mongoose';

const Service = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: mongoose.Number
    },
    addinfo: {
        type: String
    }
});

export default mongoose.model('Service', Service);
