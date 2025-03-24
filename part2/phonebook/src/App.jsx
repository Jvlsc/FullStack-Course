import { useState } from 'react'

// App Component:
const App = () => {

  // State Variables: 
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-1234567' }]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
  // Check if number is valid: Only numbers and dashes (Additional Feature).
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    if (event.target.value === '' || /^[0-9-]*$/.test(event.target.value)) {
      setNewNumber(event.target.value);
    } 
  }

  return (
    <div>
      <h2>Phonebook:</h2>
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
        {persons.map(person => <li key={person.name}>{person.name}: {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App