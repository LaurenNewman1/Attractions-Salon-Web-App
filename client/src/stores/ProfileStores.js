import { useState, useEffect } from 'react';


export default () => {
  const [loggedIn, isLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  

  return [userData, loggedIn, login, register, logout];
};
