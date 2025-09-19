import React from "react";

export const PersonsFilter = ({ handleChange }) => {
  return (
    <form>
      <div>
        filter snowm with: <input type="text" onChange={handleChange} />{" "}
      </div>
    </form>
  );
};
