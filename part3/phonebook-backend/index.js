require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const app = express();
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose');
const Person = require('./models/person');

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

// Define a custom log format
morgan.token('postData', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return '-';
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));

app.get('/', (request, response) => {
  Person.find({}).then(person => {
    response.json(person);
  })
});

app.get('/api/persons/', (request, response) => {
  Person.find({}).then(person => {
    response.json(person);
  })
});

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.number || !body.name) {
    return response.status(400).json({
      error: 'number or name is missing'
    });
  }

  // Use Mongoose to check if a person with the same name exists
  Person.findOne({ name: body.name })
    .then(existingPerson => {
      if (existingPerson) {
        return response.status(400).json({
          error: 'name already exists in the phonebook'
        });
      }

      // If the person does not exist, create and save the new person
      const person = new Person({
        name: body.name,
        number: body.number,
      });

      person.save()
        .then(savedPerson => {
          return response.json(savedPerson);
        })
        .catch(error => {
          console.error('Error saving person:', error);
          return response.status(500).json({ error: 'Internal server error' });
        });
    })
    .catch(error => {
      console.error('Error checking for existing person:', error);
      return response.status(500).json({ error: 'Internal server error' });
    });
});


app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;

  // Use Mongoose to find and remove the person by ID
  Person.findByIdAndRemove(id)
    .then(deletedPerson => {
      if (deletedPerson) {
        response.status(204).end(); // Person found and deleted
      } else {
        response.status(404).json({ error: 'Person not found' }); // Person not found
      }
    })
    .catch(error => {
      console.error('Error deleting person:', error);
      response.status(500).json({ error: 'Internal server error' });
    });
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
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