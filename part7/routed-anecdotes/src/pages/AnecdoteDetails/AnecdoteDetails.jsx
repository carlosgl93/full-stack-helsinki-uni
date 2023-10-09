import { Controller } from "./Controller";

export const AnecdoteDetails = ({ anecdote }) => {
  console.log(anecdote);
  const {} = Controller(anecdote);

  if (anecdote) {
    const { content, votes } = anecdote;
    return (
      <div>
        <h1>{content}</h1>
        <p>Has {votes} votes</p>
      </div>
    );
  }
};
