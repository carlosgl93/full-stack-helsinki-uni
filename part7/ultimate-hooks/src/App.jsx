import { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  // GET
  const fetchAll = async () => {
    const fetchResult = await axios.get(baseUrl);
    setResources([...fetchResult.data]);
  };

  // POST
  const create = async (resource) => {
    const postResult = await axios.post(baseUrl, resource);
    setResources((prev) => [...prev, postResult.data]);
  };

  // DELETE
  const deleteDoc = async (id) => {
    const deleteResult = await axios.delete(`${baseUrl}/${id}`);
    setResources(() => resources.filter((r) => r.id !== id));
  };

  // PUT
  const putDoc = async (resource) => {
    const putResult = await axios.put(`${baseUrl}/${resource.id}`, resource);

    setResources((prev) => [
      ...prev,
      ...prev.filter((r) => r.id !== resource.id),
      putResult.data,
    ]);
  };

  useEffect(() => {
    fetchAll(baseUrl);
  }, []);

  const service = {
    fetchAll,
    create,
    deleteDoc,
  };

  return [resources, service];
};

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource("http://localhost:3005/notes");
  const [persons, personService] = useResource("http://localhost:3005/persons");

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
  };

  const handleDeleteNotes = (e, id) => {
    e.preventDefault();
    noteService.deleteDoc(id);
  };

  const handleDeletePersons = (e, id) => {
    e.preventDefault();
    personService.deleteDoc(id);
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes &&
        notes.map((n) => (
          <div key={n.id}>
            <p>{n.content}</p>
            <button onClick={(e) => handleDeleteNotes(e, n.id)}>delete</button>
          </div>
        ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons?.map((n) => (
        <div key={n.id}>
          <p>
            {n.name} {n.number}
          </p>
          <button onClick={(e) => handleDeletePersons(e, n.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
