import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import {
  notification,
  removeNotification,
  setNotification,
} from "../reducers/notificationReducer";

export const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    // no filter, return all sorted by votes
    if ([...state.filter] === "")
      return state.anecdotes.sort((a, b) => b.votes - a.votes);

    // return filtered and sorted by votes
    return state.anecdotes
      .filter((an) =>
        an.content.toLowerCase().includes(state.filter.toLowerCase().trim())
      )
      .sort((a, b) => b.votes - a.votes);
  });
  const dispatch = useDispatch();
  const voteAnecdote = async (anecdote) => {
    dispatch(vote(anecdote));
    // dispatch(setNotification(`You voted: ${anecdote.content}`));
    dispatch(notification(`You voted for: '${anecdote.content}'`, 5));
    // setTimeout(() => {
    //   dispatch(removeNotification());
    // }, 5000);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};
