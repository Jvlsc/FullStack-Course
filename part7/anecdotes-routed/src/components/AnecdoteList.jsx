// Import React Tools:
import PropTypes from 'prop-types'

// Anecdote Component:
const Anecdote = ({ anecdote }) => (
  <li>
    {anecdote.content}
  </li>
)

// AnecdoteList Component:
const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} />)}
    </ul>
  </div>
)

// Prop Types - AnecdoteList Component:
AnecdoteList.propTypes = {
  anecdotes: PropTypes.array.isRequired
}

// Prop Types - Anecdote Component:
Anecdote.propTypes = {
  anecdote: PropTypes.object.isRequired
}

// Export AnecdoteList Component:
export default AnecdoteList;