const express = require('express');
const morgan = require('morgan');
const app = express();
const fs = require('fs');
const cors = require('cors');

app.use(express.json());
app.use(cors());

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

  // Update the JSON file with formatted data
  updatePersonsJSON(persons);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();

  // Update the JSON file with formatted data
  updatePersonsJSON(persons);
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Function to update the JSON file with formatted data
function updatePersonsJSON(persons) {
  const jsonContent = JSON.stringify(persons, null, 2); // Use null for default indent (2 spaces)
  fs.writeFile('./persons.json', jsonContent, (err) => {
    if (err) {
      console.log('Error writing file', err);
    } else {
      console.log('Successfully updated persons JSON file');
    }
  });
}


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})