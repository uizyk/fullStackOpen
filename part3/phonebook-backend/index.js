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
  Person.find({}).then((person) => {
    response.json(person);
  });
});

app.get('/api/persons/', (request, response) => {
  Person.find({}).then((person) => {
    response.json(person);
  });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  })
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const { body } = request;

  if (!body.number || !body.name) {
    return response.status(400).json({
      error: 'number or name is missing',
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save()
    .then((savedPerson) => response.json(savedPerson))
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

app.delete('/api/persons/:id', (request, response, next) => {
  const { id } = request.params;

  // Use Mongoose to find and remove the person by ID
  Person.findByIdAndRemove(id)
    .then((deletedPerson) => {
      if (deletedPerson) {
        response.status(204).end(); // Person found and deleted
      } else {
        response.status(404).json({ error: 'Person not found' }); // Person not found
      }
    })
    .catch((error) => next(error));
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

// Error handling middleware
function errorHandler(err, req, res, next) {
  console.error(err); // Log the error for debugging purposes

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message }); // Handle Mongoose validation errors
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Malformatted id' }); // Handle invalid ObjectId errors
  } if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  // Handle other errors
  return res.status(500).json({ error: 'Internal server error' });
}

app.use(errorHandler); // This has to be the last loaded middleware

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
