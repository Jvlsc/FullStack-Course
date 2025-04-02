// Imports Redux Tools:
import { useSelector, useDispatch } from 'react-redux'

// App Component:
const App = () => {
  // React Redux Hooks:
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  // Vote:
  const vote = (id) => {
    console.log('vote', id)
    dispatch({ type: 'VOTE', payload: id })
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
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

// Export App Component:
export default App