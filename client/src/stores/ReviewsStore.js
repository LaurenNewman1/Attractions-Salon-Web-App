import { useState, useEffect } from 'react';

const MOCK_REVIEWS = [
  {
    id: 1,
    name: 'Jackie',
    rating: 5,
    date: new Date('01/01/2000'),
    content: 'Been coming here for years, my stylist is Brandi. I recommend to anyone needing a great cut/ style and extras',
  },
  {
    id: 2,
    name: 'Melissa',
    rating: 4,
    date: new Date('01/01/2000'),
    content: 'Beautiful building that holds beautiful spirits. Brandi, you are great. Thanks for the great hair cut.',
  },
  {
    id: 3,
    name: 'Atonya Freeney',
    rating: 5,
    date: new Date('01/01/2000'),
    content: 'Emily is an experienced stylist and guaranteed to make you smile!',
  },
  {
    id: 4,
    name: 'Ivory',
    rating: 5,
    date: new Date('01/01/2000'),
    content: 'Feels like home there. Brandi is amazing and such a sweetheart',
  },
];


export default () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const callReviews = async () => {
      // const bookRequestFetch =
      const reviewsJson = MOCK_REVIEWS;

      setReviews(reviewsJson);
      setLoading(false);
    };

    if (loading) {
      callReviews();
    }
  }, []);

  return [reviews, loading];
};
