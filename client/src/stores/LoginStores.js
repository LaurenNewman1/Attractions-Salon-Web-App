import { useState, useEffect } from 'react';

const requestLogin =  async (email, password) => {
  console.log(email);
  console.log(password);

  await fetch('/api/login', {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify({ email, password })
  })
  .then((res) => {
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  })
  .then((data) => console.log(data));

  // fetch from '/api/login'
  // Login Logic Here
  // Return a true or false whether or not they logged in successfully
}

const requestRegister = async (name, email, number, password) => {
  console.log(name);
  console.log(email);
  console.log(number);
  console.log(password);

  await fetch('/api/users',
  {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify({ name, email, phone_number: number, password })
  })
  .then((res) => {
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  })
  .then((data) => console.log(data));
}

const requestLogout = async () => {
  await fetch('/api/logout', {
    method: 'DELETE',
    cache: 'no-cache',
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer' // no-referrer, *client
  })
  .then((res) => {
    return res.status === 200;
  })
}


export const useLogin = () => {
  const [loggedIn, isLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  // Call to login
  const login = (email, password) => {
    if (requestLogin(email, password))
      isLoggedIn(true)
  }

  // Call to register
  //const register = requestRegister;

  //This is just to test the register thing
  const register = (name, email, number, password) => {
    return requestRegister(name, email, number, password)
  }

  const logout = () => {
    if (requestLogout())
      isLoggedIn(false)
  }

  useEffect(() => {
    if (loggedIn)
      return

    fetch('/api/users').then((res) => {
      if (res.status === 200) {
        return res.json()
      } else {
        return null;
      }
    }).then((data) => {
      if (data !== null) {
        isLoggedIn(true);
        setUserData(data);
      } else {
        isLoggedIn(false);
        setUserData({});
      }
    })
  }, [loggedIn]);

  return [userData, loggedIn, login, register, logout];
}