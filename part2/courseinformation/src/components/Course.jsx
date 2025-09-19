import React from "react";
import { Content } from "./Content";
import { Header } from "./Header";
import { Total } from "./Total";

export const Course = ({ course }) => {
  const { name, parts } = course;

  const totalExercises = parts.reduce((acc, curr) => acc + curr.exercises, 0);

  return (
    <div>
      <Header text={name} />
      <Content parts={parts} />
      <Total total={totalExercises} />
    </div>
  );
};
