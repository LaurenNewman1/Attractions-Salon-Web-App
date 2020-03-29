/* eslint-disable max-len */
import { useState, useEffect } from 'react';

const requestDelete = async (_id) => {
  const res = await fetch(`/api/users/${_id}`, {
    method: 'DELETE',
    cache: 'no-cache',
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
  });

  return res.status === 200;
};

// eslint-disable-next-line camelcase
const requestAdd = async (name, email, phone_number, password, role) => {
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
        name, email, phone_number, password, role,
      }),
    });

  return [res.status === 200, await res.json()];
};

const requestUserUpdate = async (_id, params) => {
  const res = await fetch(`/api/users/${_id}`, {
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
  const [users, setUsers] = useState([]);
  const [users1, setUsers1] = useState([]);
  const [users2, setUsers2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone_number: '',
    password: '',
    role: Number,
  });

  const updateNewUser = (...argus) => {
    const newFields = { ...newUser };
    argus.forEach((argu) => {
      const [fieldName, val] = argu;
      newFields[fieldName] = val;
    });
    setNewUser(newFields);
  };

  const deleteUser = async (userGroupName, userGroup, _id) => {
    console.log(userGroupName);
    setLoading(true);
    const success = await requestDelete(_id);
    if (success) {
      console.log(userGroup);
      const allUsers = [...userGroup];
      allUsers.splice(users.findIndex((r) => r._id === _id), 1);
      if (userGroupName === '0') {
        setUsers(allUsers);
        console.log(users);
      } else if (userGroupName === '1') {
        setUsers1(allUsers);
      } else if (userGroupName === '2') {
        setUsers2(allUsers);
      }
    }
    updateNewUser(['name', ''], ['email', ''], ['phone_number', ''], ['password', ''], ['role', 0]);
    setLoading(false);
    return success;
  };

  const addUser = async () => {
    setLoading(true);
    const [success, rev] = await requestAdd(newUser.name, newUser.email, newUser.phone_number, newUser.password, newUser.role);
    if (success) {
      if (newUser.role === 0) {
        const allUsers = [...users];
        allUsers.push(rev);
        setUsers(allUsers);
      } else if (newUser.role === 1) {
        const allUsers = [...users1];
        allUsers.push(rev);
        setUsers1(allUsers);
      } else if (newUser.role === 2) {
        const allUsers = [...users2];
        allUsers.push(rev);
        setUsers2(allUsers);
      }
    }
    updateNewUser(['name', ''], ['email', ''], ['phone_number', ''], ['password', ''], ['role', 0]);
    setLoading(false);
    return success;
  };

  const saveUser = async (userGroup, index) => {
    setLoading(true);
    // eslint-disable-next-line no-unused-vars
    console.log(userGroup[index]._id);
    const [success, rev] = await requestUserUpdate(userGroup[index]._id, {
      name: userGroup[index].name,
      email: userGroup[index].email,
      phone_number: userGroup[index].phone_number,
      password: userGroup[index].password,
      role: userGroup[index].role,
    });
    setLoading(false);
    return success;
  };

  const updateUsers = (userGroup, index, ...argus) => {
    const allUsers = [...userGroup];
    const newFields = allUsers[index];
    argus.forEach((argu) => {
      const [fieldName, val] = argu;
      console.log('val', val);
      newFields[fieldName] = val;
    });
    allUsers[index] = newFields;
    setUsers(allUsers);
  };

  useEffect(() => {
    const callUsers = async () => {
      const usersRequestFetch = async (type) => fetch(`/api/users/roles/${type}`)
        .then((response) => response.json())
        .then((data) => data);

      setUsers(await usersRequestFetch('0'));
      setUsers1(await usersRequestFetch('1'));
      setUsers2(await usersRequestFetch('2'));
      setLoading(false);
    };

    if (loading) {
      callUsers();
    }
  }, []);

  return [users, users1, users2, newUser, loading, updateUsers,
    updateNewUser, deleteUser, addUser, saveUser];
};
