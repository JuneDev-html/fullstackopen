const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

//  ------- ---- Middleware ---- --------
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path: ', request.path);
  console.log('Body: ', request.body);
  console.log('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// Custom morgan token that shows body of request
morgan.token('body', (req) => JSON.stringify(req.body));

app.use(cors());
app.use(express.json());
app.use(requestLogger);
// ------ ------ --- END Middleware --- ----- ----------

let phonebook = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (request, response) => {
  response.json(phonebook);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = phonebook.find((person) => person.id === id);

  const custom = (request, response) => {
    response.status(404).end();
  };

  person ? response.json(person) : custom(request, response);
});

app.get('/info', (request, response) => {
  const phonebookLength = phonebook.length;
  const date = new Date();
  response.send(
    `
    <p>Phonebook has info for ${phonebookLength} people</p>
    <p>${date}</p>
    `
  );
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  phonebook = phonebook.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post(
  '/api/persons',
  morgan(':method :url :status :res[content-length] :response-time ms :body'),
  (request, response) => {
    const body = request.body;

    if (!body.name || doesExist(body.name)) {
      return response.status(400).json({
        error: doesExist(body.name) ? 'name must be unique' : 'name missing',
      });
    }

    const person = {
      id: generateId(),
      name: body.name,
      number: body.number,
    };

    phonebook = phonebook.concat(person);

    response.json(body);
  }
);

// ---- Helper Functions ----
const doesExist = (name) => {
  const exists = phonebook.find(
    (person) => person.name.toLowerCase() === name.toLowerCase()
  );

  return exists;
};

const generateId = () => {
  const id = phonebook.length > 0 ? Math.max(...phonebook.map((p) => p.id)) : 0;
  return id + 1;
};
// ----- END Helper Functions -------

app.use(unknownEndpoint);
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
