import React from 'react';

export const Notification = ({ notification }) => {
  const { type, text } = notification;

  return (
    <div className={`notification ${type}`} data-testid="notification">
      <p>{text}</p>
    </div>
  );
};
