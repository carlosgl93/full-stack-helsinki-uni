const baseUrl = "http://localhost:3001/anecdotes";
import axios from "axios";

export const getAnecdotes = () => {
  try {
    return axios.get(baseUrl).then((res) => res.data);
  } catch (error) {
    throw new Error(`error fetching anecdotes ${error}`);
  }
};

export const postAnecdotes = (anecdote) => {
  if (anecdote.length < 5) {
    throw new Error("Anecdotes must be atleast 5 chars long");
  }

  const newAnecdote = {
    id: Math.floor(Math.random() * 5000),
    content: anecdote,
    votes: 0,
  };
  return axios.post(baseUrl, newAnecdote).then((res) => res.data);
};
export const voteAnecdote = (anecdote) => {
  try {
    return axios
      .put(`${baseUrl}/${anecdote.id}`, anecdote)
      .then((res) => res.data);
  } catch (error) {
    throw new Error(`error voting anecdote ${error}`);
  }
};
