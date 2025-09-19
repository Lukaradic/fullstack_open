import React from "react";

export const Person = ({ person }) => {
  const { name, number } = person;
  return (
    <p>
      {name} {number}
    </p>
  );
};
