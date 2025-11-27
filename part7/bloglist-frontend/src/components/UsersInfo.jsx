import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers } from '../reducers/usersSlice';
import { Link } from 'react-router';
import userService from '../services/user';

export const UsersInfo = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const getAllUsers = useCallback(async () => {
    try {
      const data = await userService.getUsers();
      dispatch(setUsers(data));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  if (users.length === 0) {
    return <div>No users </div>;
  }
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <th></th>
          <th>Blogs created</th>
        </tr>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};
