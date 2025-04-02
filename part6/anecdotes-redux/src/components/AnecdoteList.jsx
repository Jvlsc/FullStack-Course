// Imports Redux Tools:
import { useSelector, useDispatch } from 'react-redux'

// Imports Reducer Functions:
import { voteAnecdote } from '../reducers/anecdoteReducer'

// Anecdote List Component:
const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    return [...state].sort((a, b) => b.votes - a.votes)
  })

  const vote = (id) => dispatch(voteAnecdote(id))

  return (
    <>
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
    </>
  )
}

// Export Anecdote List Component:
export default AnecdoteList
