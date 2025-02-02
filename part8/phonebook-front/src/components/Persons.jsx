import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FIND_PERSON } from "../queries";

export const Persons = ({ people }) => {
  const [search, setSearch] = useState("");
  const { data, isloadingFindPerson } = useQuery(FIND_PERSON, {
    variables: {
      nameToSearch: search
    },
    skip: !search
  });

  if (isloadingFindPerson) return <>Loading Please wait</>;

  if (data && data?.findPerson) {
    const p = data.findPerson;
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2>{p.name}</h2>
        <span>
          <b>Phone:</b> {p.phone}
        </span>
        <span>
          <b>Address:</b> {p.address.street} {p.address.city}
        </span>
        <button onClick={() => setSearch(null)}>Go back</button>
      </div>
    );
  }

  return people.map(p => (
    <div key={p.id}>
      <h2>{p.name}</h2>
      <span>
        <b>Phone:</b> {p.phone}
      </span>
      <button onClick={() => setSearch(p.name)}>Show address</button>
    </div>
  ));
};
