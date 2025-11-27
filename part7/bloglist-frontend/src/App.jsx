import { useEffect, useCallback } from 'react';
import blogService from './services/blogs';

import { Notification } from './components/Notification';

import { useDispatch, useSelector } from 'react-redux';

import { setBlogs } from './reducers/blogSlice';
import { checkStorageForUserData } from './reducers/authSlice';
import { Route, Routes } from 'react-router';
import { UsersInfo } from './components/UsersInfo';
import { HomePage } from './pages/HomePage';
import { UserPage } from './pages/UserPage';
import { BlogPage } from './pages/BlogPage';
import { Navigation } from './components/Navigation';

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

  return (
    <div>
      <Notification />
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={<HomePage user={user} getBlogs={getBlogs} />}
        />
        <Route path="users" element={<UsersInfo />} />
        <Route path="users/:id" element={<UserPage />} />
        <Route
          path="blogs/:id"
          element={<BlogPage user={user} getBlogs={getBlogs} />}
        />
      </Routes>
    </div>
  );
};

export default App;
