import { useState, useEffect } from "react";
import personsServices from "../services/persons";

const AppController = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    personsServices.getAll().then((res) => {
      setPersons(res);
    });
  }, []);

  const storeNewPerson = (event, newPersonData) => {
    event.preventDefault();
    personsServices.create(newPersonData).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
    });
    setNewName("");
    setNewNumber("");
  };

  const updatePhoneNumber = (event, id) => {
    event.preventDefault();

    const personBeingEdited = persons.find((p) => p.id === id);

    const updatedPerson = { ...personBeingEdited, number: newNumber };

    personsServices.update(id, updatedPerson);
  };

  const handleDelete = (id) => {
    personsServices.deletePerson(id).then((data) => {
      console.log(persons, setPersons, "state");
      return setPersons(persons.filter((p) => p.id !== id));
    });
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

  const handleUpdatePhoneNumber = (event, id) => {
    event.preventDefault();
    updatePhoneNumber(event, id);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newName === "" || newNumber === "") {
      return;
    }
    if (persons.find((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
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

  return {
    persons,
    newName,
    newNumber,
    search,
    setPersons,
    setNewName,
    setNewNumber,
    setSearch,
    storeNewPerson,
    handleNameChange,
    handleNumberChange,
    handleSearch,
    handleSubmit,
    updatePhoneNumber,
    handleUpdatePhoneNumber,
    handleDelete,
  };
};

export default AppController;
