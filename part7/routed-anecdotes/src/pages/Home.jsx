import { AnecdoteList, Footer } from "../components";
import { About, CreateNew } from "./";

export const Home = ({ anecdotes, addNew }) => {
  return (
    <div>
      <h1>Software anecdotes</h1>
      <AnecdoteList anecdotes={anecdotes} />
      <About />
      <CreateNew addNew={addNew} />
    </div>
  );
};
