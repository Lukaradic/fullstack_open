import React from "react";

export const PersonsFilter = ({ handleChange, value }) => {
  return (
    <form>
      <div>
        filter snowm with:{" "}
        <input type="text" onChange={handleChange} value={value} />{" "}
      </div>
    </form>
  );
};
