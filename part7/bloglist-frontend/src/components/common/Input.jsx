import React from 'react';

export const Input = ({ placeholder, value, onChange, name, id }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent hover:border-gray-400 transition duration-150"
    />
  );
};
