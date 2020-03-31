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
    },
    time: {
        type: Date,
    },
});

export default mongoose.model('Review', Review);