// Imports Redux Tools:
import { useSelector, useDispatch } from 'react-redux'

// Imports Reducer Functions:
import { voteAnecdote } from '../reducers/anecdoteReducer'

// Anecdote List Component:
const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => dispatch(voteAnecdote(id))
  
  const anecdotesToShow = anecdotes
    .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes)

  return (
    <>
      <h3>Anecdotes List:</h3>
      {anecdotesToShow.map(anecdote =>
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
