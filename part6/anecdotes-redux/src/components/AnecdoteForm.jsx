// Imports React Redux Tools:
import { useDispatch } from 'react-redux'

// Imports Reducer Functions:
import { create } from '../reducers/anecdoteReducer'

// Anecdote Form Component:
const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreate = (event) => {
    event.preventDefault()
    dispatch(create(event.target.anecdote.value))
    event.target.anecdote.value = ''
  }

  return (
    <>
      <h3>Create New Anecdote:</h3>
      <form onSubmit={handleCreate}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

// Export Anecdote Form Component:
export default AnecdoteForm