import { useState } from 'react'

// Anecdote Component:
const Anecdote = ({ anecdote, votes, text }) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p> {'>>>'} {text.prefix} {votes} {text.suffix}</p>
    </div>
  )
}

// Button Component:
const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

// App Component:
const App = () => {
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
      next: 'Next Anecdote',
      vote: 'Vote'
    },
    anecdote: {
      prefix: 'Has',
      suffix: 'votes'
    }
  }

  // Save selected anecdote index in state:
  const [selected, setSelected] = useState(0)

  // Save votes array in state (Initialized with zeros):
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  // Function to handle random anecdote selection:
  // Math.random() function returns a random number between [0,1).
  // Math.floor() function rounds the random number down to the nearest integer.
  // The random index is then used to set the selected anecdote.
  const handleRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    console.log('Random Index:', randomIndex)
    setSelected(randomIndex)
  }

  // Function to handle voting:
  // Create a copy of the votes array and increment the vote count for the selected anecdote.
  // Then update the votes array with the new vote count.
  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    console.log('New Votes:', newVotes)
    setVotes(newVotes)
  }

  return (
    <>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} text={stringsData.anecdote} />
      <Button handleClick={handleVote} text={stringsData.buttons.vote} />
      <Button handleClick={handleRandomAnecdote} text={stringsData.buttons.next} />
    </>
  )
}

export default App