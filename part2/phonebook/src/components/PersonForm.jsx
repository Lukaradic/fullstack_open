import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const PersonForm = ({ handleSubmit }) => {
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const cloned = { ...newPerson };
    cloned[name] = value;
    setNewPerson(cloned);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(newPerson);
    setNewPerson({
      name: "",
      number: "",
      id: uuidv4(),
    });
  };

  return (
    <div>
      <h3>Add a new</h3>
      <form onSubmit={handleFormSubmit}>
        <div>
          name:{" "}
          <input
            name="name"
            onChange={handleFormChange}
            value={newPerson?.name}
          />
        </div>
        <div>
          phone:{" "}
          <input
            name="number"
            onChange={handleFormChange}
            value={newPerson?.number}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};
