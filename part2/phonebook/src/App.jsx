import { useState } from "react";
import { PersonsMap } from "./components/PersonsMap";
import { PersonForm } from "./components/PersonForm";
import { PersonsFilter } from "./components/PersonsFilter";
import { checkIfNameExists } from "./util";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (newPerson) => {
    if (checkIfNameExists(persons, newPerson.name)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const cloned = [...persons];
      cloned.push(newPerson);
      setPersons(cloned);
    }
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonsFilter handleChange={handleSearchTerm} value={searchTerm} />
      <PersonForm handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <PersonsMap persons={persons} searchTerm={searchTerm} />
    </div>
  );
};

export default App;
