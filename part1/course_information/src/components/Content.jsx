import React from "react";
import { Part } from "./Part";

export const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, i) => (
        <Part part={part} key={i} />
      ))}
    </>
  );
};
