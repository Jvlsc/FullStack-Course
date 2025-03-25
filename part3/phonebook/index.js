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

// [GET] - All Persons Route:
// Returns the entire phonebook data as JSON
app.get('/api/persons', (request, response) => {
  response.json(data)
})

// Start the Server:
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})