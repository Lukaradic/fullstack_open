import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from '../reducers/authSlice';
import { setNotification } from '../reducers/notificationSlice';
import userService from '../services/user';

import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';

export const LoginPage = () => {
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
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    // <form onSubmit={handleFormSubmit}>
    //   <div>
    //     <label htmlFor="username">Username</label>
    //     <input
    //       type="text"
    //       name="username"
    //       id="username"
    //       value={formData.username}
    //       onChange={handleChange}
    //       data-testid="form--username"
    //     />
    //   </div>
    //   <div>
    //     <label htmlFor="password">Password</label>
    //     <input
    //       type="password"
    //       name="password"
    //       id="password"
    //       value={formData.password}
    //       onChange={handleChange}
    //       data-testid="form--password"
    //     />
    //   </div>
    //   <button type="submit" data-testid="form--button__submit">
    //     Login
    //   </button>
    // </form>
    <div className="w-md ml-auto mr-auto py-20 flex flex-col gap-4">
      <div className="space-y-6">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            username
          </label>
          <Input
            value={formData.username}
            onChange={handleChange}
            name="username"
            id="username"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            password
          </label>
          <Input
            value={formData.password}
            onChange={handleChange}
            name="password"
            id="password"
          />
        </div>
      </div>
      <Button onClick={handleSubmit} type="submit" text="Login" />
    </div>
  );
};
