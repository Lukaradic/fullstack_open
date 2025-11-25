import React from 'react';

import { useSelector } from 'react-redux';

export const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification.content) {
    return null;
  }

  return (
    <div
      className={`notification ${notification.type}`}
      data-testid="notification"
    >
      <p>{notification.content}</p>
    </div>
  );
};
