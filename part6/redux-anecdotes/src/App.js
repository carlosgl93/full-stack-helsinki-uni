import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AnecdoteForm } from "./components/AnecdoteForm";
import { AnecdoteList } from "./components/AnecdoteList";
import { Filter } from "./components/Filter";
import Notification from "./components/Notification";
import { initializeAnectdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnectdotes());
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
      <Notification />
    </div>
  );
};

export default App;
