import React from 'react';

export const Button = ({ onClick, text, type = 'button', children }) => {
  return (
    <button
      className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-5 rounded-lg transition duration-200 cursor-pointer"
      onClick={onClick}
      type={type}
    >
      {text}
      {children}
    </button>
  );
};
