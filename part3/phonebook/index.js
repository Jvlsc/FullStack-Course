// Import the Express.js and Morgan:
const express = require('express')
const morgan = require('morgan')

// Server Port:
const PORT = 3001

// Express Instance:
const app = express()

// Middleware (Morgan):
// Configure Morgan for logging with 'tiny' format
app.use(morgan('tiny'))

// Middleware (Express json-parser):
// Parse JSON Request Bodies
app.use(express.json())


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

// [GET] - Root Route:
// Returns a simple HTML greeting
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

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
  response.json(data)
})

// [GET] - Single Person Route:
// Returns a single person's data based on their ID
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = data.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
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
      error: 'Name must be unique' 
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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})