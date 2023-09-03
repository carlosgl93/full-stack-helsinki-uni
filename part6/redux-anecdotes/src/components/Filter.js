import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { filterAnecdotes } from "../reducers/filterReducer";

export const Filter = () => {
  const dispatch = useDispatch();

  const handleFilter = (e) => {
    dispatch(filterAnecdotes(e.target.value));
  };

  return (
    <div
      style={{
        marginBottom: "10px",
      }}
    >
      <label>Filter anecdotes</label>
      <input name="filter" type="text" onChange={handleFilter} />
    </div>
  );
};
