/* eslint-disable max-len */
import React, { useState } from 'react';
import {
  Typography,
} from '@material-ui/core';
import {
} from '@material-ui/icons';
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
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [dialog, setDialog] = useState(false);
  // const [viewing, setViewing] = useState({});
  const [alert, setAlert] = useState({
    open: false,
    type: '',
    text: '',
  });
  const [userGroup, setUserGroup] = useState([]);
  const [userGroupName, setUserGroupName] = useState('');

  const [users, users1, users2, loading, updateUsers,
    updateNewUser, deleteUser, addUser, saveUser] = useUsers();

  const setDelete = (userGName, group, _id) => {
    setUserGroup(group);
    setUserGroupName(userGName);
    console.log(_id);
    setConfirmDelete(_id);
  };

  const onClickAdd = async () => {
    console.log(open);
    setDialog(false);
    console.log(dialog);
    const success = await addUser();
    setAlert({
      open: true,
      type: success ? TYPE_SUCCESS : TYPE_ERROR,
      text: success ? 'User added successfully.' : 'Failed to add user.',
    });
  };

  const onClickDelete = async (_id) => {
    setConfirmDelete(false);
    setOpen(false);
    const success = await deleteUser(userGroupName, userGroup, _id);
    setAlert({
      open: true,
      type: success ? TYPE_SUCCESS : TYPE_ERROR,
      text: success ? 'User deleted successfully.' : 'Deletion failed.',
    });
  };

  const onClickSave = async (group, index) => {
    const success = await saveUser(group, index);
    setAlert({
      open: true,
      type: success ? TYPE_SUCCESS : TYPE_ERROR,
      text: success ? 'User saved successfully.' : 'Save failed.',
    });
    setOpen(false);
  };

  // const cancelChanges = (index) => {
  //   updateUsers(index, ['name', viewing.name], ['email', viewing.email], ['phone_number', viewing.phone_number], ['password', viewing.password], ['role', viewing.role]);
  //   setOpen(false);
  // };

  // const expandChange = (panel) => (event, isExpanded) => {
  //   // cancel any previously closed ones
  //   if (open !== false) {
  //     cancelChanges(open);
  //   }
  //   // save history on newly opened ones
  //   if (isExpanded) {
  //     setViewing({ ...users[panel] });
  //   } else { // cancel if closing
  //     cancelChanges(panel);
  //   }
  //   setOpen(isExpanded ? panel : false);
  // };

  // const renderName = (name, panel) => {
  //   if (open === panel) {
  //     return (
  //       <TextField
  //         value={name}
  //         onClick={(event) => event.stopPropagation()}
  //         onChange={(event) => updateUsers(panel, ['reviewer', event.target.value])}
  //       />
  //     );
  //   }

  //   return (
  //     <Typography>{name}</Typography>
  //   );
  // };

  return (
    <Page maxWidth="md">
      {loading ? <Loading /> : null}
      <Typography
        className={classes.pageHead}
        align="center"
        variant="h4"
        display="block"
        gutterBottom
      >
        <div style={{ width: 40 }} />
        Services
        <NewUser onClickAdd={onClickAdd} setAlert={setAlert} updateNewUser={updateNewUser} />
      </Typography>

      <Typography variant="h5" className={classes.header}>Clients</Typography>
      {!users.length ? null
        : users.map((user, index) => (
          <EditUser
            user={user}
            index={index}
            deleteUser={setDelete}
            changeService={() => onClickSave(users, index)}
            updateUser={updateUsers}
            userGroup={users}
            userGroupName="0"
          />
        ))}

      <Typography variant="h5" className={classes.header}>Staff</Typography>
      {!users1.length ? null
        : users1.map((user, index) => (
          <EditUser
            user={user}
            index={index}
            deleteUser={setDelete}
            changeService={() => onClickSave(users, index)}
            updateUser={updateUsers}
            userGroup={users}
            userGroupName="0"
          />
        ))}

      <Typography variant="h5" className={classes.header}>Admins</Typography>
      {!users2.length ? null
        : users2.map((user, index) => (
          <EditUser
            user={user}
            index={index}
            deleteUser={setDelete}
            changeService={() => onClickSave(users, index)}
            updateUser={updateUsers}
            userGroup={users}
            userGroupName="0"
          />
        ))}

      {confirmDelete
        ? (
          <Confirm
            open={confirmDelete !== false}
            content="Clicking delete will permanently remove this review."
            confirmText="Delete"
            onConfirm={() => onClickDelete(userGroup[confirmDelete]._id)}
            onCancel={() => setConfirmDelete(false)}
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
