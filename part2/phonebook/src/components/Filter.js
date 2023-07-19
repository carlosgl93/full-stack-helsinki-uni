import React from "react";

const Filter = ({ search, handleSearch }) => {
  return (
    <p>
      search contacts: <input value={search} onChange={handleSearch} />{" "}
    </p>
  );
};

export default Filter;
