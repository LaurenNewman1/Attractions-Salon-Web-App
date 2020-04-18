import Review from '../../model/review.js';

export const reviewParams = {
    reviewer: 'test',
    rating: 5,
    review: 'review',
    time: '2014-01-01T23:28:56.782Z'
};

export const MakeReview = async () => {
    const review = await Review.create(reviewParams);
    return review;
};