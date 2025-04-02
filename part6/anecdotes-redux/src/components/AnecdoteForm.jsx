// Imports React Redux Tools:
import { useDispatch } from 'react-redux'

// Imports Reducer Functions:
import { createAnecdote } from '../reducers/anecdoteReducer'

// Anecdote Form Component:
const AnecdoteForm = () => {
  // React Redux Hooks:
  const dispatch = useDispatch()

  // Create:
  const create = (event) => {
    event.preventDefault()
    dispatch(createAnecdote(event.target.anecdote.value))
    event.target.anecdote.value = ''
  }

  // Render:
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

// Export Anecdote Form Component:
export default AnecdoteForm