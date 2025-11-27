import React, { useMemo } from 'react';

import { useParams, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import blogService from '../services/blogs';
import { useDispatch } from 'react-redux';
import { displayNotification } from '../reducers/notificationSlice';

export const BlogPage = ({ getBlogs, user }) => {
  const blog = useSelector((state) => state.blog);
  const blogs = blog.blogs;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const blogId = params.id;

  const goBack = () => {
    navigate(-1);
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

  const selectedBlog = useMemo(() => {
    return blogs.find((blog) => blog.id === blogId);
  }, [blogId, blogs]);

  if (!selectedBlog) {
    return (
      <div>
        <h3>No blog found</h3>
        <button onClick={goBack}>Go back</button>
      </div>
    );
  }

  return (
    <div>
      <h3>{selectedBlog.title}</h3>
      <a target="_blank" href={selectedBlog.url}>
        {selectedBlog.url}
      </a>
      <p>
        {selectedBlog.likes} likes <button onClick={handleLike}>like</button>
      </p>
    </div>
  );
};
