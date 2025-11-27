import React from 'react';
import userService from '../services/user';
import { LoginForm } from './LoginForm';
import { UserInfo } from './UserInfo';

import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../reducers/authSlice';
import { setNotification } from '../reducers/notificationSlice';

import { Link } from 'react-router';
export const Navigation = () => {
  const authState = useSelector((state) => state.auth);
  const user = authState?.user || {};

  const dispatch = useDispatch();
  const loginUser = async (formData) => {
    try {
      const res = await userService.login(formData);
      const { token, data } = res.data;
      dispatch(setUserData(data, token));
    } catch (error) {
      console.error(error);
      dispatch(setNotification('error', 'Failed to login'));
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      {user && <UserInfo name={user?.username} />}
      {!user && <LoginForm handleLogin={loginUser} />}
    </div>
  );
};
