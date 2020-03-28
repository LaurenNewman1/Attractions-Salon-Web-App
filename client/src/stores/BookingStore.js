import { useHistory } from 'react-router-dom';

const requestBook = async (booking) => {
  const res = await fetch('/api/appointments',
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
        booking,
      }),
    });
  return [res.status === 200, await res.json()];
};

export default () => {
  const history = useHistory();
  const sendRequest = async (booking) => {
    const [success, res] = await requestBook(booking);
    if (success) {
      history.push(`/confirmation/${res._id}`);
    }
  };
  return [sendRequest];
};
