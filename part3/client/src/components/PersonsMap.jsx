import React from "react";
import { Person } from "./Person";
import { filterByName } from "../util";
export const PersonsMap = ({ persons, searchTerm, handleDelete }) => {
  const array = searchTerm ? filterByName(persons, searchTerm) : persons;
  return array.map((person) => (
    <Person key={person._id} person={person} handleDelete={handleDelete} />
  ));
};
