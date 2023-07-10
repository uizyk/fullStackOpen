const express = require('express');
const morgan = require('morgan');
const app = express();
const fs = require('fs');

app.use(express.json());

// Define a custom log format
morgan.token('postData', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return '-';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));

let persons = require('./persons.json');

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>');
});

app.get('/info', (request, response) => {
  const numOfPeople = persons.length;
  const currentDate = new Date();
  
  response.send(
    `<p>Phonebook has info for ${numOfPeople} people</p>
    <p>${currentDate}</p>
    `
  );
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.post('/api/persons', (request, response) => {
  const id = Math.floor(Math.random() * 1000);
  const body = request.body;
  
  if (!body.number || !body.name) {
    return response.status(400).json({
      error: 'number or name is missing'
    });
  } 
  
  const existingPerson = persons.find(person => person.name === body.name);
  if (existingPerson) {
    return response.status(400).json({
      error: 'name already exists in the phonebook'
    });
  }
  
  const newPerson = {
    id: id,
    name: body.name,
    number: body.number
  };
  
  persons.push(newPerson);

  response.status(201).json(newPerson);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();

  // Code below is to update the JSON file with the new list of persons and not just store in memory
  fs.writeFile('./persons.json', JSON.stringify(persons), (err) => {
    if (err) {
      console.log('Error writing file', err);
      response.status(500).end();
    } else {
      console.log('Successfully deleted person');
    }
  });
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
