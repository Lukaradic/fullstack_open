import React from 'react';
import { CreateBlog } from '../components/CreateBlog';
import { BlogList } from '../components/BlogList';

export const HomePage = ({ user, getBlogs }) => {
  return (
    <div className="px-12 py-4">
      <h2 className="text-lg text-center">Blogs</h2>
      {user && (
        <div className="flex flex-col gap-8">
          <CreateBlog getBlogs={getBlogs} />
          <BlogList user={user} getBlogs={getBlogs} />
        </div>
      )}
    </div>
  );
};
