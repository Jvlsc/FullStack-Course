import { useState } from 'react'

// Anecdote Component:
const Anecdote = ({ anecdote }) => {
  return <p>{anecdote}</p>
}

// Button Component:
const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

// App Component:
const App = () => {
  // Save selected anecdote index in state:
  const [selected, setSelected] = useState(0)
  
  // Collection of anecdotes:
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  // Strings data:
  const stringsData = {
    buttons: {
      next: 'Next Anecdote'
    }
  }

  // Function to handle random anecdote selection:
  // The random index is generated using the Math.random() function which returns a random number between 0 and 1.
  // The Math.floor() function is used to round the random number down to the nearest integer.
  // The random index is then used to set the selected anecdote to the anecdote at the random index.
  const handleRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  return (
    <>
      <Anecdote anecdote={anecdotes[selected]} />
      <Button handleClick={handleRandomAnecdote} text={stringsData.buttons.next} />
    </>
  )
}

export default App