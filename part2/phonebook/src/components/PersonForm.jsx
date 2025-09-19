import React from "react";
import { useState } from "react";

export const PersonForm = ({ handleSubmit }) => {
  const [newPerson, setNewPerson] = useState({
    name: "",
    phone: "",
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
      phone: "",
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
            name="phone"
            onChange={handleFormChange}
            value={newPerson?.phone}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};
