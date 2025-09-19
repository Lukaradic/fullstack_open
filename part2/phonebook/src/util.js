export const checkIfNameExists = (personsArray, newName) => {
  return personsArray.some((person) => person.name === newName);
};

export const filterByName = (personsArray, searchTerm) => {
  return personsArray.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
