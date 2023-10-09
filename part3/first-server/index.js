const express = require("express");
const app = express();

app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const noteToSend = notes.find((n) => n.id === id);
  console.log(id, "id");
  console.log(noteToSend, "noteToSend");

  if (noteToSend) {
    response.json(noteToSend);
  } else {
    response.statusMessage = "There is no resource for that id.";
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((n) => n.id !== id);

  response.status(204).end();
});

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    response.status(400).json({
      error: "Note has no content",
    });
  }

  const newNote = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  };

  notes = notes.concat(newNote);
  console.log(notes, "notes");

  console.log(newNote);
  response.json(newNote);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
