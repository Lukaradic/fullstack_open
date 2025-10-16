import React from "react";

export const Notification = ({ notification }) => {
  const { type, text } = notification;

  console.log(notification);
  return (
    <div className={`notification ${type}`}>
      <p>{text}</p>
    </div>
  );
};
