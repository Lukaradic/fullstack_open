import React from 'react';
import Blog from './Blog';
import { useDispatch, useSelector } from 'react-redux';
import { displayNotification } from '../reducers/notificationSlice';
import blogService from '../services/blogs';

export const BlogList = ({ user, getBlogs }) => {
  const blog = useSelector((state) => state.blog);
  const blogs = blog.blogs;
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      await blogService.deleteBlog(id);
      dispatch(displayNotification('success', 'Deleted blog'));
      await getBlogs();
    } catch (err) {
      console.error(err);
      dispatch(displayNotification('error', 'Failed to delete blog'));
    }
  };

  const handleLike = async (blog) => {
    try {
      await blogService.like({ ...blog, user });
      await getBlogs();
    } catch (err) {
      console.error(err);
      dispatch(displayNotification('error', 'Failed to like'));
    }
  };

  if (!blogs?.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={() => handleLike(blog)}
          handleDelete={() => handleDelete(blog)}
          userId={user.id}
        />
      ))}
    </div>
  );
};
