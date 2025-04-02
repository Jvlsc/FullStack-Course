// Imports Redux Tools:
import { useSelector, useDispatch } from 'react-redux'

// Imports Reducer Functions:
import { voteAnecdote } from './reducers/anecdoteReducer'

// Imports Components:
import AnecdoteForm from './components/AnecdoteForm'

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
      <AnecdoteForm />
    </div>
  )
}

// Export App Component:
export default App