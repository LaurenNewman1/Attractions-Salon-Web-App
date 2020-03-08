import { useState, useEffect } from 'react';

const requestLogin = (email, password) => {
  console.log(email);
  console.log(password);
  // Login Logic Here
  // Return a true or false whether or not they logged in successfully
}

const requestRegister = (name, email, number, password) => {
  // Registration Logic Here
  // Return a true or false whether or not the registration was successful
  // Currently a successful registration does not automatically log them in, do you feel this should be changed?
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
  const register = requestRegister;

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
      }
    })
  }, [loggedIn]);

  return [userData, loggedIn, login, register];
}