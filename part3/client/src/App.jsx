import { useState, useEffect } from "react";
import { PersonsMap } from "./components/PersonsMap";
import { PersonForm } from "./components/PersonForm";
import { PersonsFilter } from "./components/PersonsFilter";
import { checkIfNameExists, getIdByName } from "./util";
import phonebookService from "./services/phonebook";
import { Notification } from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchPersons = async () => {
    try {
      const res = await phonebookService.getAll();
      const data = res?.data;

      if (data) {
        setPersons(data);
      }
    } catch (error) {
      const message = error?.message;
      showNotification(message, "error");
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  const showNotification = (message, type) => {
    if (type === "error") {
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(""), 5000);
    } else {
      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  const handleSubmit = async (newPerson) => {
    try {
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
          await phonebookService.update(id, newPerson);
        }
      } else {
        await phonebookService.create(newPerson);
      }
      fetchPersons();
      showNotification(`Added ${newPerson.name}`, "success");
    } catch (error) {
      const message = error?.response?.data?.message ?? error?.message;
      showNotification(message, "error");
    }
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await phonebookService.delete(id);
      fetchPersons();
    } catch (error) {
      const message = error?.message;
      showNotification(message, "error");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />
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
