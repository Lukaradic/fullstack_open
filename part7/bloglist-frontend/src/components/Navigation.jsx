import React from 'react';
import { UserInfo } from './UserInfo';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { Button } from './common/Button';

export const Navigation = () => {
  const authState = useSelector((state) => state.auth);
  const user = authState?.user;

  return (
    <div className="flex gap-2 px-6 py-2 bg-gray-100 items-center">
      <div className="flex-1 gap-2 flex">
        <Link
          className="border-b-2 hover:border-black border-transparent"
          to="/"
        >
          blogs
        </Link>
        <Link
          className="border-b-2 hover:border-black border-transparent"
          to="/users"
        >
          users
        </Link>
      </div>
      {user && <UserInfo name={user?.username} />}
      {!user && (
        <Button>
          <Link to="/login">Login</Link>
        </Button>
      )}
    </div>
  );
};
