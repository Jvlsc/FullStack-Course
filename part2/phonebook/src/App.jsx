import { useState } from 'react'

// App Component:
const App = () => {

  // State Variables: 
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // Filter Persons (Case Insensitive):
  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  // Event Handler - Add Contact:
  const addPerson = (event) => {
    event.preventDefault()
    console.log('Add Contact Button Clicked', event.target)
    
    // Check if name is empty:
    // (Additional Feature)
    if (newName === '') {
      alert('Name is required')
      return
    }

    // Check if name already exists:
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    // Add New Person to Phonebook:
    const personObject = { 
      name: newName,
      number: newNumber
    }

    // Update Phonebook and Reset Form:
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  // Event Handler - Handle Name Change:
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  // Event Handler - Handle Number Change:
  // Allow only numbers and dashes (Additional Feature).
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    if (event.target.value === '' || /^[0-9-]*$/.test(event.target.value)) {
      setNewNumber(event.target.value);
    } 
  }

  // Event Handler - Handle Filter Change:
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook:</h2>
      <div>
        Filter Shown with: <input value={filter} onChange={handleFilterChange} />
      </div>
      <br />
      <h2>Add New Contact:</h2>
      <form onSubmit={addPerson}>
        <div>
          · Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          · Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <br />
      <h2>Numbers:</h2>
      <ul>
        {filteredPersons.map(person => <li key={person.name}>{person.name}: {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App