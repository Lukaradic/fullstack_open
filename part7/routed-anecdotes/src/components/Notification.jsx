import React from "react";

export const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }
  return (
    <div
      style={{
        borderWidth: 1,
        borderColor: "#333",
        borderStyle: "solid",
        padding: 12,
      }}
    >
      {notification}
    </div>
  );
};
