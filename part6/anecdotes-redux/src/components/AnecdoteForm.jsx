// Imports React Redux Tools:
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

// Imports Services:
import anecdotesService from '../services/anecdotes'

// Anecdote Form Component:
const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const newAnecdote = await anecdotesService.create(content)

    dispatch(createAnecdote(newAnecdote))
    dispatch(setNotification(`Anecdote Created: "${newAnecdote.content}"`))
    
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