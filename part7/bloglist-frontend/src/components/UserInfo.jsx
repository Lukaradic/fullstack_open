import React from 'react';
import { useDispatch } from 'react-redux';
import { removeUserData } from '../reducers/authSlice';
import { Button } from './common/Button';

export const UserInfo = ({ name }) => {
  const dispatch = useDispatch();
  return (
    <div data-testid="user-info">
      {`${name} is logged in`}{' '}
      {/* <button onClick={() => dispatch(removeUserData())}>Logout</button> */}
      <Button onClick={() => dispatch(removeUserData())} text="Loguout" />
    </div>
  );
};
