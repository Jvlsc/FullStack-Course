// Import the dotenv Module:
require('dotenv').config()

// Import the Express.js, Morgan:
const express = require('express')
const morgan = require('morgan')

// Import the MongoDB - Person Model:
const Person = require('./models/person')

// Express Instance:
const app = express()

// Middleware (Morgan):
// Create a custom token for POST body
morgan.token('post-body', (request) => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  }
  return ''
})

// Middleware (Morgan):
// Configure Morgan for logging with custom format
app.use(morgan('[Express] :method :url | :status | :res[content-length] bytes | :response-time ms | :post-body |'))

// Middleware (Express json-parser):
// Parse JSON Request Bodies
app.use(express.json())

// Middleware (Express static):
// Serve static files from the dist directory
app.use(express.static('dist'))

// [GET] - Info Route:
// Displays current time and number of entries in the phonebook
app.get('/info', (request, response, next) => {
  Person.find({})
  .then(persons => {
    console.log(`[MongoDB] Fetched ${persons.length} persons`)
    response.send(`
      <div>
        <h1>Phonebook Information</h1>
        <h4>· Phonebook has info for ${persons.length} people</h4>
        <h4>· ${new Date().toString()}</h4>
      </div>
    `)
  })
  .catch(error => {
    console.log(`[MongoDB] Error Fetching Persons: ${error}`)
    next(error)
  })
})

// [GET] - All Persons Route:
// Returns the entire phonebook data as JSON
app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => {
      console.log(`[MongoDB] Fetched ${persons.length} persons`)
      response.json(persons)
    })
    .catch(error => {
      console.log(`[MongoDB] Error Fetching Persons: ${error}`)
      next(error)
    })
})

// [GET] - Single Person Route:
// Returns a single person's data based on their ID
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        console.log(`[MongoDB] Fetched Person: ${person.name} - ${person.number}`)
        response.json(person)
      } else {
        console.log(`[MongoDB] Person not Found`)
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(`[MongoDB] Error Fetching Person: ${error}`)
      next(error)
    })
})

// [POST] - Create Person Route:
// Creates a new person in the phonebook
app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body

  // Check if name is missing
  if (!name) {
    console.log(`[Express] Error Creating Person (Name Missing)`)
    return response.status(400).json({ error: 'name is missing' })
  }

  // Check if number is missing
  if (!number) {
    console.log(`[Express] Error Creating Person (Number Missing)`)
    return response.status(400).json({ error: 'number is missing' })
  }

  // Create a new person:
  const person = new Person({
    name: name,
    number: number,
  })

  // Save the new person to the database:
  person.save()
    .then(savedPerson => {
      console.log(`[MongoDB] Saved Person: ${savedPerson.name} - ${savedPerson.number}`)
      response.json(savedPerson)
    })
    .catch(error => {
      console.log(`[MongoDB] Error Saving Person: ${error}`)
      next(error)
    })
})

// [PUT] - Update Person Route:
// Updates a person's data based on their ID
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  // Check if name is missing
  if (!name) {
    console.log(`[Express] Error Creating Person (Name Missing)`)
    return response.status(400).json({ error: 'name is missing' })
  }

  // Check if number is missing
  if (!number) {
    console.log(`[Express] Error Updating Person (Number Missing)`)
    return response.status(400).json({ error: 'number is missing' })
  }

  // Find the person by ID:
  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        console.log(`[MongoDB] Person not Found`)
        return response.status(404).send({ error: 'Person not found' })
      }

      // Update the person's name and number:
      person.name = name
      person.number = number

      // Save the updated person to the database:
      return person.save()
        .then((updatedPerson) => {
          console.log(`[MongoDB] Updated Person: ${updatedPerson.name} - ${updatedPerson.number}`)
          response.json(updatedPerson)
        })
        .catch(error => {
          console.log(`[MongoDB] Error Updating Person (Saving): ${error}`)
          next(error)
        })
    })
    .catch(error => {
      console.log(`[MongoDB] Error Updating Person (Finding): ${error}`)
      next(error)
    })
})

// [DELETE] - Delete Person Route:
// Deletes a person from the phonebook based on their ID
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      console.log(`[MongoDB] Deleted Person: ${result.name} - ${result.number}`)
      response.status(204).end()
    })
    .catch(error => {
      console.log(`[MongoDB] Error Deleting Person: ${error}`)
      next(error)
    })
})

// Middleware (Error Handler):
// Create a custom error handler middleware
const errorHandler = (error, request, response, next) => {
  // CastError: Detected in GET y PUT /api/persons/:id
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted id' })
  }

  // TypeError: Detected in DELETE /api/persons/:id
  if (error.name === 'TypeError') {
    return response.status(400).json({ error: 'Malformatted id' })
  }

  // MongooseError: Detected when MongoDB Connection Fails
  if (error.name === 'MongooseError') {
    response.status(500).send({ error: 'Check MongoDB Connection' })
  }

  // Unexpected Error: If any other error occurs
  response.status(500).send({ error: 'Unexpected Error' })
}

// Middleware (Error Handler):
// Error handling middleware
app.use(errorHandler)

// Start the Server:
app.listen(process.env.SERVER_PORT, () => {
  console.log(`[Express] Server running on port ${process.env.SERVER_PORT}`)
})