// Imports React Redux Tools:
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

// Anecdote Form Component:
const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`Anecdote Created: "${content}"`))
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