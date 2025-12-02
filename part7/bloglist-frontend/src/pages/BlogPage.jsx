import React, { useEffect, useMemo, useCallback, useState } from 'react';

import { useParams, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import blogService from '../services/blogs';
import { useDispatch } from 'react-redux';
import { displayNotification } from '../reducers/notificationSlice';
import { CommentForm } from '../components/CommentForm';
import { Button } from '../components/common/Button';

export const BlogPage = ({ getBlogs, user }) => {
  const blog = useSelector((state) => state.blog);
  const blogs = blog.blogs;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const blogId = params.id;

  const [comments, setComments] = useState([]);

  const goBack = () => {
    navigate(-1);
  };

  const selectedBlog = useMemo(
    () => blogs.find((blog) => blog.id === blogId),
    [blogId, blogs]
  );

  const getComments = useCallback(async () => {
    if (!selectedBlog?.id) {
      return;
    }
    const res = await blogService.getComments(selectedBlog.id);
    if (Array.isArray(res)) {
      setComments(res);
    }
  }, [selectedBlog]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  const handleLike = async () => {
    try {
      await blogService.like({ ...selectedBlog, user });
      await getBlogs();
    } catch (err) {
      console.error(err);
      dispatch(displayNotification('error', 'Failed to like'));
    }
  };

  const handlePost = async (comment) => {
    try {
      await blogService.postComment(selectedBlog.id, comment);
      await getComments();
    } catch (err) {
      console.error(err);
    }
  };

  if (!selectedBlog) {
    return (
      <div>
        <h3>No blog found</h3>
        <button onClick={goBack}>Go back</button>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4 justify-center">
      <h2 className="text-center text-lg">{selectedBlog.title}</h2>
      <a target="_blank" href={selectedBlog.url}>
        {selectedBlog.url}
      </a>
      <p>
        {selectedBlog.likes} likes <Button text="like" onClick={handleLike} />
      </p>
      <CommentForm postComment={handlePost} />
      <ul className="gap-2 flex flex-col">
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};
