// Import PropTypes:
import PropTypes from 'prop-types'

// Anecdote Component:
const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <p>Has {anecdote.votes} votes</p>
    <p>For more info see: <a href={anecdote.info}>Link</a></p>
  </div>
)

// Prop Types - Anecdote Component:
Anecdote.propTypes = {
  anecdote: PropTypes.object.isRequired
}

// Export Anecdote Component:
export default Anecdote;
