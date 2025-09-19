import { useState, useEffect } from "react";
import { PersonsMap } from "./components/PersonsMap";
import { PersonForm } from "./components/PersonForm";
import { PersonsFilter } from "./components/PersonsFilter";
import { checkIfNameExists, getIdByName } from "./util";
import notesService from "./services/notes";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPersons = async () => {
    const res = await notesService.getAll();
    const data = res?.data;

    if (data) {
      setPersons(data);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  const handleSubmit = async (newPerson) => {
    if (checkIfNameExists(persons, newPerson.name)) {
      if (
        window.confirm(
          `${newPerson.name} is already added to phoonebook, replace the old number with a new one?`
        )
      ) {
        const id = getIdByName(persons, newPerson.name);

        if (id === null) {
          return;
        }
        await notesService.update(id, newPerson);
      }
    } else {
      await notesService.create(newPerson);
    }
    fetchPersons();
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id) => {
    await notesService.delete(id);
    fetchPersons();
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonsFilter handleChange={handleSearchTerm} value={searchTerm} />
      <PersonForm handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <PersonsMap
        persons={persons}
        searchTerm={searchTerm}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
