import mongoose, { Schema } from 'mongoose';

const Review = new Schema({
    reviewer: {
        type: String,
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
});

export default mongoose.model('Review', Review);