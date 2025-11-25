import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationSlice';
import blogsReducer from './reducers/blogSlice';
import authReducer from './reducers/authSlice';

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogsReducer,
    auth: authReducer,
  },
});
