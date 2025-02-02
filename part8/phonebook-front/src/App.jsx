import { useState } from "react";
import "./App.css";
import { gql, useQuery } from "@apollo/client";
import { Persons } from "./components/Persons";
import { AddPerson } from "./components/addPerson";
import { ALL_PERSONS } from "./queries";

function App() {
  const [error, setError] = useState(null);

  const { data, isLoading } = useQuery(ALL_PERSONS);

  const notify = message => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 10000);
  };

  if (isLoading) return <>Loading... Please Wait</>;

  if (data?.allPersons)
    return (
      <>
        <Notify error={error} />
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
