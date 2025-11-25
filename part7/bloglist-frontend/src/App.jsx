import { useEffect, useCallback } from 'react';
import blogService from './services/blogs';
import { LoginForm } from './components/LoginForm';
import { UserInfo } from './components/UserInfo';
import { Notification } from './components/Notification';
import { CreateBlog } from './components/CreateBlog';

import { useDispatch, useSelector } from 'react-redux';
import { BlogList } from './components/BlogList';

import { setBlogs } from './reducers/blogSlice';
import { checkStorageForUserData, setUserData } from './reducers/authSlice';
import { setNotification } from './reducers/notificationSlice';
import userService from './services/user';

const App = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const user = auth.user;

  const getBlogs = useCallback(async () => {
    const res = await blogService.getAll();
    const blogs = res?.data.sort((a, b) => b.likes - a.likes);
    dispatch(setBlogs({ blogs }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkStorageForUserData());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      getBlogs();
    }
  }, [getBlogs, user]);

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
    <div>
      <Notification />
      {user && <UserInfo name={user?.username} />}
      <h2>blogs</h2>
      {!user && <LoginForm handleLogin={loginUser} />}
      {user && (
        <>
          <CreateBlog getBlogs={getBlogs} />
          <BlogList user={user} getBlogs={getBlogs} />
        </>
      )}
    </div>
  );
};

export default App;
