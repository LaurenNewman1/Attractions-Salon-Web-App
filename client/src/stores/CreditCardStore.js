import { useState, useEffect } from 'react';

// eslint-disable-next-line camelcase
const requestCreditCard = async (someId, number, exp_month, exp_year, cvc) => {
  // eslint-disable-next-line camelcase
  const res = await fetch(`/api/users/card/${someId}`, {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify({
      number, exp_month, exp_year, cvc,
    }),
  });

  return [res.status === 200, await res.json()];
};

const getCreditCards = async (someId) => {
  // eslint-disable-next-line camelcase
  const res = await fetch(`/api/users/card/${someId}`, {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    // body: JSON.stringify({
    //   number, exp_month, exp_year, cvc,
    // }),
  });

  return [res.status === 200, await res.json()];
};

const getCreditCard = async (cardId) => {
  // eslint-disable-next-line camelcase
  const res = await fetch(`/api/card/${cardId}`, {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    // body: JSON.stringify({
    //   number, exp_month, exp_year, cvc,
    // }),
  });

  return [res.status === 200, await res.json()];
};

export default () => {
  const newCardToUser = async (id, number, expMonth, expYear, cvc) => {
    const [success, res] = await requestCreditCard(id, number, expMonth, expYear, cvc);
    return [success, res];
  };

  const getCards = async (someId) => {
    const [success, res] = await getCreditCards(someId);
    return [success, res];
  };

  const getCard = async (cardId) => {
    const [success, res] = await getCreditCard(cardId);
    return [success, res];
  };

  return [newCardToUser, getCards, getCard];
};
