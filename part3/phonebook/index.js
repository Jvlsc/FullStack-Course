// Import the Express.js:
const express = require('express')

// Express Instance:
const app = express()

// Server Port:
const PORT = 3001

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

// Start the Server:
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})