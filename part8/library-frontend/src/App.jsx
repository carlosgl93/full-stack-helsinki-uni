import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Login } from "./components/Login";
import RecommendedBooks from "./components/RecommendedBooks";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("library-user-token");
  };

  useEffect(() => {
    const localToken = localStorage.getItem("library-user-token");
    if (localToken) setToken(localToken);
  }, []);

  return (
    <div>
      {error && <p>{error || error.message}</p>}
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("recommended")}>Recommendations</button>}

        {token && <button onClick={() => setPage("add")}>add book</button>}

        {!token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <button onClick={handleLogout}>logout</button>
        )}
      </div>

      <Authors show={page === "authors"} />
      <RecommendedBooks show={page === "recommended"} />
      <Books show={page === "books"} />

      <NewBook show={page === "add"} setPage={setPage} />
      <Login setPage={setPage} setToken={setToken} setError={setError} show={page === "login"} />
    </div>
  );
};

export default App;
