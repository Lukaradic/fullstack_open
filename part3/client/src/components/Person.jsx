import React from "react";

export const Person = ({ person, handleDelete }) => {
  const { name, number, _id } = person;

  const handleDeleteClick = () => {
    if (window.confirm(`Delete ${name}?`)) {
      handleDelete(_id);
    }
  };

  return (
    <p>
      {name} {number}
      <button onClick={handleDeleteClick} style={{ marginLeft: 4 }}>
        delete
      </button>
    </p>
  );
};
