import React from "react";

export const Person = ({ person }) => {
  const { name, phone } = person;
  return (
    <p>
      {name} {phone}
    </p>
  );
};
