// Imports React Redux Tools:
import { useDispatch } from 'react-redux'

// Imports Reducer Functions:
import { createAnecdote } from '../reducers/anecdoteReducer'

// Anecdote Form Component:
const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = (event) => {
    event.preventDefault()
    dispatch(createAnecdote(event.target.anecdote.value))
    event.target.anecdote.value = ''
  }

  return (
    <>
      <h3>Create New Anecdote:</h3>
      <form onSubmit={create}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

// Export Anecdote Form Component:
export default AnecdoteForm