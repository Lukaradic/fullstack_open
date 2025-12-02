import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from './common/Button';
import { Input } from './common/Input';

export const CommentForm = ({ postComment }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.length) {
      return;
    }
    await postComment(comment);
    setComment('');
  };

  return (
    <form className="flex gap-2">
      <Input
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        placeholder="Add comment"
      />
      <Button text="Post" onClick={handleSubmit} />
    </form>
  );
};
