
const fetchReviews = async () => {
  const ret = await fetch('/api/reviews')
    .then((response) => response.json())
    .then((data) => data);
  return ret;
};

export default fetchReviews;
