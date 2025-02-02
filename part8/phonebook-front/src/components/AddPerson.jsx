import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_PERSON } from "../mutations";
import { ALL_PERSONS } from "../queries";

export const flexColumnStyle = {
  display: "flex",
  flexDirection: "column"
};

export const AddPerson = ({ setError }) => {
  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [
      {
        query: ALL_PERSONS
      }
    ],
    onError: error => {
      const messages = error.graphQLErrors.map(e => e.message).join("\n");
      setError(messages);
    }
  });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const handleSumbit = async e => {
    e.preventDefault();

    await createPerson({
      variables: {
        name,
        phone,
        street,
        city
      }
    });

    setName("");
    setPhone("");
    setStreet("");
    setCity("");
  };

  return (
    <div>
      <h1>Add Person</h1>

      <form onSubmit={handleSumbit} style={flexColumnStyle}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" onChange={({ target }) => setName(target.value)} />
        <label htmlFor="phone">Phone</label>
        <input type="text" name="phone" id="phone" onChange={({ target }) => setPhone(target.value)} />
        <label htmlFor="street">Street</label>
        <input type="text" name="street" id="street" onChange={({ target }) => setStreet(target.value)} />
        <label htmlFor="city">City</label>
        <input type="text" name="city" id="city" onChange={({ target }) => setCity(target.value)} />
        <button type="submit" disabled={!name || !phone}>
          Save
        </button>
      </form>
    </div>
  );
};
