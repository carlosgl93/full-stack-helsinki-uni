import { useState } from "react";
import "./App.css";
import { useQuery, useApolloClient } from "@apollo/client";
import { Persons } from "./components/Persons";
import { AddPerson } from "./components/addPerson";
import { ALL_PERSONS } from "./queries";
import { Login } from "./components/Login";
import { useEffect } from "react";

function App() {
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const { data, isLoading } = useQuery(ALL_PERSONS);

  const notify = message => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 10000);
  };

  const onLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  useEffect(() => {
    notify(error);
  }, [error]);

  useEffect(() => {
    const localToken = localStorage.getItem("phonenumbers-user-token");
    if (localToken) setToken(localToken);
  }, []);

  if (!token)
    return (
      <>
        <Notify error={error} />
        <Login setToken={setToken} setError={notify} />
      </>
    );

  if (isLoading) return <>Loading... Please Wait</>;

  if (data?.allPersons)
    return (
      <>
        <Notify error={error} />
        <button onClick={onLogout}>Log out</button>
        <Persons people={data?.allPersons} />
        <AddPerson setError={setError} />
      </>
    );
}

export default App;

const Notify = ({ error }) => {
  if (!error) return null;

  return (
    <>
      <div style={{ color: "red" }}>{error}</div>
    </>
  );
};
