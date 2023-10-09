import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Form from "./components/Form";
import Filter from "./components/Filter";
import personsServices from "./services/persons";
import ErrorNotification from "./components/ErrorNotification";
import SuccessNotification from "./components/SuccessNotification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    personsServices.getAll().then((res) => {
      setPersons(res);
    });
  }, []);

  const handleDelete = (id) => {
    const contactToDelete = persons.find((p) => id === p.id);
    const confirmation = window.confirm(
      `Are you sure you want to delete ${contactToDelete.name}?`
    );
    if (confirmation) {
      personsServices
        .deletePerson(id)
        .then((data) => {
          setSuccess("Contact deleted successfully!");
          setTimeout(() => {
            setSuccess("");
          }, 2500);
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((error) => {
          setError(`There was an error removing this contact ${error.message}`);
          setTimeout(() => {
            setError("");
          }, 2500);
          setPersons(persons.filter((p) => p.id !== id));
        });
    } else return;
  };

  const storeNewPerson = (event, newPersonData) => {
    event.preventDefault();
    personsServices
      .create(newPersonData)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setSuccess("Contact created successfully!");
        setTimeout(() => {
          setSuccess("");
        }, 2500);
      })
      .catch((error) => {
        if (error.message === "Request failed with status code 400") {
          setError(
            "Verify that the name is longer than 2 characters or the phone number is longer than 5 numbers. Make sure the phone number is valid"
          );
        } else {
          setError(error.message);
        }
        setTimeout(() => {
          setError("");
        }, 2500);
      });
    setNewName("");
    setNewNumber("");
  };

  const updateContact = (id, updatedContact) => {
    personsServices
      .update(id, updatedContact)
      .then((updatedPerson) => {
        const filteredPersons = persons.filter(
          (p) => p.id !== updatedPerson.id
        );
        setPersons(() => filteredPersons.concat(updatedPerson));
        setSuccess("Contact updated successfully!");
        setTimeout(() => {
          setSuccess("");
        }, 2500);
        return;
      })
      .catch((error) => {
        console.log(error);
        if (error.message === "Request failed with status code 400") {
          setError(
            setError(
              "Verify that the name is longer than 2 characters or the phone number is longer than 5 numbers. Make sure the phone number is valid"
            )
          );
        } else {
          setError(error.message);
        }
        setTimeout(() => {
          setError("");
        }, 2500);
        return;
      });
    return;
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newName === "" || newNumber === "") {
      return;
    }

    const alreadyExistingPerson = persons.find((p) => p.name === newName);

    if (alreadyExistingPerson) {
      window.confirm(
        `${alreadyExistingPerson.name} is already added to the phonebook, do you want to replace his number?`
      );

      const updatePerson = {
        ...alreadyExistingPerson,
        number: newNumber,
      };

      updateContact(alreadyExistingPerson.id, updatePerson);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };
    setNewName("");
    setNewNumber("");

    storeNewPerson(event, newPerson);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} search={search} />
      <h3>Add a new</h3>
      <Form
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <ErrorNotification message={error} />
      <SuccessNotification message={success} />

      {persons && (
        <Persons
          search={search}
          persons={persons}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default App;
