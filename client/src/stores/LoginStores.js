import { useState, useEffect } from 'react';

const requestLogin =  async (email, password) => {
  console.log(email);
  console.log(password);

  await fetch('/api/login')
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

  await fetch('/api/signup')
  .then((res) => {
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  })
  .then((data) => console.log(data));
  // fetch from '/api/signUp'
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
  //const register = requestRegister;

  //This is just to test the register thing
  const register = (name, email, number, password) => {
    requestRegister(name, email, number, password)
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
      }
    })
  }, [loggedIn]);

  return [userData, loggedIn, login, register];
}