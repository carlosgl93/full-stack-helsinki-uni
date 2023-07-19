import React from "react";

const Persons = ({ search, persons }) => {
  return (
    <div>
      {search
        ? persons
            .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
            .map((p) => (
              <p key={p.id}>
                {p.name} {p.number}
              </p>
            ))
        : persons.map((p) => (
            <p key={p.id}>
              {p.name} {p.number}
            </p>
          ))}
    </div>
  );
};

export default Persons;
