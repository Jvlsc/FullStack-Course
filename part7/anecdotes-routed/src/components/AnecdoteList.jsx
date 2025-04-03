// Import Link Component:
import { Link } from 'react-router-dom'

// Import React Tools:
import PropTypes from 'prop-types'

// AnecdoteList Component:
const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
)

// Prop Types - AnecdoteList Component:
AnecdoteList.propTypes = {
  anecdotes: PropTypes.array.isRequired
}

// Export AnecdoteList Component:
export default AnecdoteList;