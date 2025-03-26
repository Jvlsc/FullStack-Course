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

// Initial Phonebook Data:
let data = [
  { 
    id: "1",
    name: "Arto Hellas", 
    number: "040-123456"
  },
  { 
    id: "2",
    name: "Ada Lovelace", 
    number: "39-44-5323523"
  },
  { 
    id: "3",
    name: "Dan Abramov", 
    number: "12-43-234345"
  },
  { 
    id: "4",
    name: "Mary Poppendieck", 
    number: "39-23-6423122"
  }
]

// [GET] - Info Route:
// Displays current time and number of entries in the phonebook
app.get('/info', (request, response) => {
  response.send(`
    <div>
      <h1>Phonebook Information</h1>
      <h4>· Phonebook has info for ${data.length} people</h4>
      <h4>· ${new Date().toString()}</h4>
    </div>
  `)
})

// [GET] - All Persons Route:
// Returns the entire phonebook data as JSON
app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => {
      console.log(`[MongoDB] Fetched ${persons.length} persons`)
      response.json(persons)
    })
    .catch(error => {
      console.log(`[MongoDB] Error Fetching Persons: ${error.message}`)
      response.status(500).end()
    })
})

// [GET] - Single Person Route:
// Returns a single person's data based on their ID
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      console.log(`[MongoDB] Fetched person: ${person.name} - ${person.number}`)
      response.json(person)
    })
    .catch(error => {
      console.log(`[MongoDB] Error Fetching Person: ${error.message}`)
      response.status(404).end()
    })
})

// [POST] - Create Person Route:
// Creates a new person in the phonebook
// Generates ID as a random number between 1 and 1000000
app.post('/api/persons', (request, response) => {
  const body = request.body

  // Check if name is missing
  if (!body.name) {
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  }

  // Check if number is missing
  if (!body.number) {
    return response.status(400).json({ 
      error: 'number is missing' 
    })
  }

  // Check if name is unique
  if (data.find(person => person.name === body.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    id: (Math.floor(Math.random() * 1000000) + 1).toString(),
    name: body.name,
    number: body.number
  }

  data = data.concat(person)
  response.json(person)
})

// [DELETE] - Delete Person Route:
// Deletes a person from the phonebook based on their ID
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = data.find(person => person.id === id)
  if (!person) { 
    return response.status(404).end()
  } else {
    data = data.filter(person => person.id !== id)
    response.status(204).end()
  }
})

// Start the Server:
app.listen(process.env.PORT, () => {
  console.log(`[Express] Server running on port ${process.env.PORT}`)
})