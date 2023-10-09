import { useState } from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import { Menu, Footer, AnecdoteList } from "./components";
import { About, CreateNew, Home, AnecdoteDetails } from "./pages";

const App = () => {
  console.log("rerender");
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState("");

  const notify = (notificationMessage) => {
    setNotification(notificationMessage);
    setTimeout(() => setNotification(""), 5000);
  };

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    notify(`Notification created successfully`);
    return anecdote;
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const matchAnecdoteId = useMatch("/anecdotes/:id");
  const anecdote = matchAnecdoteId
    ? anecdotes.find((a) => a.id === Number(matchAnecdoteId.params.id))
    : null;

  return (
    <>
      <Menu />
      {notification.length > 0 && <h3>{notification}</h3>}
      <Routes>
        <Route
          path="/"
          element={<Home anecdotes={anecdotes} addNew={addNew} />}
        />
        <Route
          path="/anecdotes/:id"
          element={<AnecdoteDetails anecdote={anecdote} />}
        />
        <Route
          path="/anecdotes"
          element={<AnecdoteList anecdotes={anecdotes} />}
        />

        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
