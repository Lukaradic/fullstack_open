import React from 'react';
import { useDispatch } from 'react-redux';
import { removeUserData } from '../reducers/authSlice';

export const UserInfo = ({ name }) => {
  const dispatch = useDispatch();
  return (
    <div data-testid="user-info">
      {`${name} is logged in`}{' '}
      <button onClick={() => dispatch(removeUserData())}>Logout</button>
    </div>
  );
};
