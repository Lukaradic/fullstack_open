import React from "react";

export const Search = ({ value, onChange }) => {
  const handleChange = (e) => {
    const text = e.target.value;

    onChange(text);
  };

  return (
    <div>
      find countries{" "}
      <input value={value} onChange={handleChange} name="country" type="text" />
    </div>
  );
};
