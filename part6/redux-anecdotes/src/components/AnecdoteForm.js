import React from "react";
import { useDispatch } from "react-redux";
import anecdoteReducer, {
  createNew,
  appendAnecdote,
} from "../reducers/anecdoteReducer";
import {
  removeNotification,
  setNotification,
} from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

export const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = async (event) => {
    event.preventDefault();
    const content = event.target.newAnecdote.value;
    event.target.newAnecdote.value = "";
    dispatch(createNew(content));
    dispatch(
      setNotification(
        `Anecdote created successfully: ${event.target.newAnecdote.value}`
      )
    );
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };
  return (
    <form onSubmit={create}>
      <h2>Create New Anecdote</h2>

      <div>
        <input name="newAnecdote" />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};
