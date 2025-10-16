import React from "react";

export const UserInfo = ({ name, logOut }) => {
  return (
    <div>
      {`${name} is logged in`} <button onClick={logOut}>Logout</button>
    </div>
  );
};
