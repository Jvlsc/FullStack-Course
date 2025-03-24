import { useState } from 'react'

// App Component:
const App = () => {
  
  // State Variables: 
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]) 
  const [newName, setNewName] = useState('')

  // Event Handler - Add Contact:
  const addPerson = (event) => {
    event.preventDefault()
    console.log('Add Contact Button Clicked', event.target)
    
    // Check if name already exists
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    // Add New Person to Phonebook:
    const personObject = { name: newName }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  // Event Handler - Handle Name Change:
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook:</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers:</h2>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App