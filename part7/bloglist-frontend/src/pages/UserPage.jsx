import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';

export const UserPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.users);

  const id = params.id;

  const selectedUser = useMemo(() => {
    return users.find((user) => user.id === id);
  }, [id, users]);

  if (!selectedUser) {
    return (
      <div>
        <h3>User not found</h3>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}>Go back</button>
      <h3>{selectedUser.name}</h3>
      <ul>
        {selectedUser.blogs.map((blog) => (
          <li>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};
