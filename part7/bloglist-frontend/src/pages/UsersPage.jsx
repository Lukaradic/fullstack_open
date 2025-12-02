import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers } from '../reducers/usersSlice';
import { Link } from 'react-router';
import userService from '../services/user';

export const UsersPage = () => {
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
    <div className="px-12 py-4 justify-center flex flex-col gap-12">
      <h2 className="text-center text-lg"> Users</h2>
      <table className="bg-white">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Blogs created
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="px-6 py-4 text-sm text-gray-900">
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {user.blogs.length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
