import { useState, useEffect } from 'react';

const requestDelete = async (_id) => {
  const res = await fetch(`/api/reviews/${_id}`, {
    method: 'DELETE',
    cache: 'no-cache',
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
  });

  return res.status === 200;
};

const requestAdd = async (reviewer, rating, review) => {
  const res = await fetch('/api/reviews',
    {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify({
        reviewer, rating, review,
      }),
    });

  return [res.status === 200, await res.json()];
};

const requestReviewUpdate = async (id, params) => {
  const res = await fetch(`/api/reviews/${id}`, {
    method: 'PUT',
    cache: 'no-cache',
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(params),
  });

  return [res.status === 200, await res.json()];
};

export default () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({
    reviewer: '',
    rating: 5,
    review: '',
  });

  const updateNewReview = (...argus) => {
    const newFields = { ...newReview };
    argus.forEach((argu) => {
      const [fieldName, val] = argu;
      newFields[fieldName] = val;
    });
    setNewReview(newFields);
  };

  const deleteReview = async (_id) => {
    setLoading(true);
    const success = await requestDelete(_id);
    if (success) {
      const allReviews = [...reviews];
      allReviews.splice(reviews.findIndex((r) => r._id === _id), 1);
      setReviews(allReviews);
    }
    updateNewReview(['reviewer', ''], ['rating', 5], ['review', '']);
    setLoading(false);
    return success;
  };

  const addReview = async () => {
    setLoading(true);
    const [success, rev] = await requestAdd(newReview.reviewer, newReview.rating, newReview.review);
    if (success) {
      const allReviews = [...reviews];
      allReviews.push(rev);
      setReviews(allReviews);
    }
    updateNewReview(['reviewer', ''], ['rating', 5], ['review', '']);
    setLoading(false);
    return success;
  };

  const saveReview = async (index) => {
    setLoading(true);
    // eslint-disable-next-line no-unused-vars
    const [success, rev] = await requestReviewUpdate(reviews[index]._id, {
      reviewer: reviews[index].reviewer,
      rating: reviews[index].rating,
      review: reviews[index].review,
    });
    setLoading(false);
    return success;
  };

  const updateReviews = (index, ...argus) => {
    const allReviews = [...reviews];
    const newFields = allReviews[index];
    argus.forEach((argu) => {
      const [fieldName, val] = argu;
      newFields[fieldName] = val;
    });
    allReviews[index] = newFields;
    setReviews(allReviews);
  };

  useEffect(() => {
    const callReviews = async () => {
      const reviewsRequestFetch = await fetch('/api/reviews')
        .then((response) => response.json())
        .then((data) => data);

      setReviews(reviewsRequestFetch);
      setLoading(false);
    };

    if (loading) {
      callReviews();
    }
  }, []);

  return [reviews, loading, newReview, updateReviews,
    updateNewReview, deleteReview, addReview, saveReview];
};
