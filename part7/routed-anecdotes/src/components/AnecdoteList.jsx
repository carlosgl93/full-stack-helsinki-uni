import { Link } from "react-router-dom";

export const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(({ id, content }) => (
        <Link to={`anecdotes/${id}`} key={id}>
          <li>{content}</li>
        </Link>
      ))}
    </ul>
  </div>
);
