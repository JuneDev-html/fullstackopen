const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.static('build'));
app.use(cors());

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
];

// handle http GET requests from application root
// app.get('/', (request, response) => response.send('<h1>Hello World!</h1>'));

// handle http GET requests from 'notes' path of application fo ALL resources
app.get('/api/notes', (request, response) => response.json(notes));

// handles http GET requests from individual resources
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  // this changes the http message sent immediately after the status code
  const custom = (request, response) => {
    // response.statusMessage = 'this is a custom message';
    response.status(404).end();
  };

  note ? response.json(note) : custom(request, response);
});

// handles HTTP DELETE request
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

// handle HTTP POST request to add new note to server
app.post('/api/notes', (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  };
  console.log(note);
  notes = notes.concat(note);

  response.json(note);
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
