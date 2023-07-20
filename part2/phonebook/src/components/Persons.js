import React from "react";

const Persons = ({ search, persons, handleDelete }) => {
  return (
    <div>
      {search
        ? persons
            .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
            .map((p) => (
              <div key={p.id + p.name}>
                <p>
                  {p.name} {p.number}
                </p>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </div>
            ))
        : persons.map((p) => (
            <div key={p.id + p.name}>
              <p>
                {p.name} {p.number}
              </p>
              <button onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          ))}
    </div>
  );
};

export default Persons;
