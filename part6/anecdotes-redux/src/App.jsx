// Imports Redux Tools:
import { useSelector, useDispatch } from 'react-redux'

// Imports Reducer Functions:
import { voteAnecdote, createAnecdote } from './reducers/anecdoteReducer'

// App Component:
const App = () => {
  // React Redux Hooks:
  const anecdotes = useSelector(state => {
    return [...state].sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  // Vote:
  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  // Create:
  const create = (event) => {
    event.preventDefault()
    dispatch(createAnecdote(event.target.anecdote.value))
    event.target.anecdote.value = ''
  }

  // Render:
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

// Export App Component:
export default App