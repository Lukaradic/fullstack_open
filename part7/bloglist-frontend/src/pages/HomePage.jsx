import React from 'react';
import { CreateBlog } from '../components/CreateBlog';
import { BlogList } from '../components/BlogList';

export const HomePage = ({ user, getBlogs }) => {
  return (
    <>
      <h2>blogs</h2>
      {user && (
        <>
          <CreateBlog getBlogs={getBlogs} />
          <BlogList user={user} getBlogs={getBlogs} />
        </>
      )}
    </>
  );
};
