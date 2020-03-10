import { useState, useEffect } from 'react';

const requestLogin = async (email, password) => {
  const res = await fetch('/api/login', {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify({ email, password }),
  });

  return [res.status === 200, await res.json()];
};

const requestRegister = async (name, email, number, password) => {
  const res = await fetch('/api/users',
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
        name, email, phone_number: number, password,
      }),
    });

  return [res.status === 200, await res.json()];
};

const requestLogout = async () => {
  const res = await fetch('/api/logout', {
    method: 'DELETE',
    cache: 'no-cache',
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
  });

  return res.status === 200;
};


export default () => {
  const [loggedIn, isLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  // Call to login
  const login = async (email, password) => {
    const response = await requestLogin(email, password);
    if (response[0]) { isLoggedIn(true); }

    return response;
  };

  // Call to register
  // const register = requestRegister;
  // eslint-disable-next-line max-len
  const register = async (name, email, number, password) => requestRegister(name, email, number, password);

  const logout = async () => {
    if (await requestLogout()) { isLoggedIn(false); }
  };

  useEffect(() => {
    if (loggedIn) { return; }

    fetch('/api/users').then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      return null;
    }).then((data) => {
      if (data !== null) {
        isLoggedIn(true);
        setUserData(data);
      } else {
        isLoggedIn(false);
        setUserData({});
      }
    });
  }, [loggedIn]);

  return [userData, loggedIn, login, register, logout];
};
