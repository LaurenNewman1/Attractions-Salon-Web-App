import React, { useState, useEffect } from 'react';
import {
  Typography,
} from '@material-ui/core';
import Page from '../../components/Page';
import useStyles from '../../css/EditServiceStyles';
import useUsers from '../../stores/UserActionsStore';
import EditUser from '../../components/EditUser';
import Confirm from '../../components/Confirm';
import Loading from '../../components/Loading';
import NewUser from '../../components/NewUser';
import Alert, { TYPE_SUCCESS, TYPE_ERROR } from '../../components/Alert';

const Users = () => {
  const classes = useStyles();
  const [open, setOpen] = useState({
    i: -1,
    list: '',
  });
  const [confirmDelete, setConfirmDelete] = useState(-1);
  const [viewing, setViewing] = useState({});
  const [alert, setAlert] = useState({
    open: false,
    type: '',
    text: '',
  });
  const [userGroup, setUserGroup] = useState([]);
  const [userGroupName, setUserGroupName] = useState('');
  const [subtypes, setSubtypes] = useState([]);

  const [users, users1, users2,, loading, updateUsers,
    updateNewUser, deleteUser, addUser, saveUser, services] = useUsers();

  useEffect(() => {
    const changeServicesToSubTypes = Object.keys(services).map((key) => services[key]);
    const merged = changeServicesToSubTypes.flat(1);
    setSubtypes(merged);
  }, [services]);

  const setDelete = (userGName, group, index) => {
    setUserGroup(group);
    setUserGroupName(userGName);
    setConfirmDelete(index);
  };

  const onClickAdd = async () => {
    const success = await addUser();
    setAlert({
      open: true,
      type: success ? TYPE_SUCCESS : TYPE_ERROR,
      text: success ? 'User added successfully.' : 'Failed to add user.',
    });
  };

  const onClickDelete = async (_id) => {
    setConfirmDelete(-1);
    setOpen({ i: -1, list: '' });
    const success = await deleteUser(userGroupName, _id);
    setAlert({
      open: true,
      type: success ? TYPE_SUCCESS : TYPE_ERROR,
      text: success ? 'User deleted successfully.' : 'Deletion failed.',
    });
  };

  const onClickSave = async (id) => {
    const success = await saveUser(id, viewing);
    setAlert({
      open: true,
      type: success ? TYPE_SUCCESS : TYPE_ERROR,
      text: success ? 'User saved successfully.' : 'Save failed.',
    });
    setOpen({ i: -1, list: '' });
  };

  const cancelChanges = (index, groupName) => {
    updateUsers(groupName, index, ['name', viewing.name], ['email', viewing.email],
      ['phone_number', viewing.phone_number], ['specialties', viewing.specialties], ['role', Number(viewing.role)],
      ['title', viewing.title], ['bio', viewing.bio]);
    setOpen({ i: -1, list: '' });
  };

  const expandChange = (panel, list) => (event, isExpanded) => {
    // cancel any previously closed ones
    if (open.i > -1 && open.list.length) {
      cancelChanges(open.i, list);
    }
    // save history on newly opened ones
    if (isExpanded) {
      switch (list) {
        case '0':
          setViewing({ ...users[panel] });
          break;
        case '1':
          setViewing({ ...users1[panel] });
          break;
        case '2':
          setViewing({ ...users2[panel] });
          break;
        default:
          break;
      }
    } else { // cancel if closing
      cancelChanges(open.i, list);
    }
    setOpen(isExpanded ? { i: panel, list } : { i: -1, list: '' });
  };

  return (
    <Page maxWidth="md">
      {loading ? <Loading disableShrink /> : null}
      <div style={{ paddingTop: 5 }}>
        <h1
          className={classes.pageHead}
          align="center"
          display="block"
          gutterBottom
        >
          <div style={{ width: 40 }} />
          Users
          <NewUser onClickAdd={onClickAdd} setAlert={setAlert} updateNewUser={updateNewUser} />
        </h1>
      </div>
      <Typography variant="h4" className={classes.header}>Admins</Typography>
      {!users2.length ? null
        : users2.map((user, index) => (
          <EditUser
            key={user._id}
            user={user}
            index={index}
            deleteUser={setDelete}
            saveUser={(id) => onClickSave(id)}
            updateUser={updateUsers}
            userGroup={users2}
            userGroupName="2"
            open={open}
            subtypes={subtypes}
            expandChange={(panel, list) => expandChange(panel, list)}
            cancelChanges={(panel, list) => cancelChanges(panel, list)}
          />
        ))}
      <Typography variant="h4" className={classes.header}>Staff</Typography>
      {!users1.length ? null
        : users1.map((user, index) => (
          <EditUser
            key={user._id}
            user={user}
            index={index}
            deleteUser={setDelete}
            saveUser={(id) => onClickSave(id)}
            updateUser={updateUsers}
            userGroup={users1}
            userGroupName="1"
            subtypes={subtypes}
            open={open}
            expandChange={(panel, list) => expandChange(panel, list)}
            cancelChanges={(panel, list) => cancelChanges(panel, list)}
          />
        ))}
      <Typography variant="h4" className={classes.header}>Clients</Typography>
      {!users.length ? null
        : users.map((user, index) => (
          <EditUser
            key={user._id}
            user={user}
            index={index}
            deleteUser={setDelete}
            saveUser={(id) => onClickSave(id)}
            updateUser={updateUsers}
            userGroup={users}
            userGroupName="0"
            open={open}
            expandChange={(panel, list) => expandChange(panel, list)}
            cancelChanges={(panel, list) => cancelChanges(panel, list)}
          />
        ))}
      {confirmDelete !== -1
        ? (
          <Confirm
            open={confirmDelete !== -1}
            title={`Delete ${userGroup[confirmDelete].name}'s account?`}
            content="Clicking delete will permanently remove this user."
            confirmText="Delete"
            onConfirm={() => onClickDelete(userGroup[confirmDelete]._id)}
            onCancel={() => setConfirmDelete(-1)}
          />
        ) : null}
      <Alert
        open={alert.open}
        type={alert.type}
        text={alert.text}
        onClose={() => setAlert({ open: false, type: '', text: '' })}
      />
    </Page>
  );
};

export default Users;
