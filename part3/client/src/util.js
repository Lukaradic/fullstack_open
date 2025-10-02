export const checkIfNameExists = (personsArray, newName) => {
  return personsArray.some((person) => person.name === newName);
};

export const getIdByName = (personsArray, name) => {
  const person = personsArray.find((person) => person.name === name);
  if (!person) {
    return null;
  }
  return person._id;
};

export const filterByName = (personsArray, searchTerm) => {
  return personsArray.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
