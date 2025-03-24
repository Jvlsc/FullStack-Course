// Person Component:
const Person = ({ person, onDelete }) => {
  return (
    <li>
      {person.name}: {person.number} <button onClick={() => onDelete(person.id)}>Delete</button>
    </li>
  )
}

// Persons Component:
const Persons = ({ persons, onDelete }) => {
  return (
    <ul>
      {persons.map(person => <Person key={person.id} person={person} onDelete={onDelete} />)}
    </ul>
  )
}

export default Persons