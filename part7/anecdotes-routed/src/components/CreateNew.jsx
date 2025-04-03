// Import React Tools:
import { useNavigate } from 'react-router-dom'

// Import Custom Hooks:
import useField from '../hooks/useField'

// Import PropTypes:
import PropTypes from 'prop-types'

// CreateNew Component:
const CreateNew = ({ addNewAnecdote }) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addNewAnecdote({ 
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content} />
        </div>
        <div>
          author
          <input name='author' {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

// Prop Types - CreateNew Component:
CreateNew.propTypes = {
  addNewAnecdote: PropTypes.func.isRequired
}

// Export CreateNew Component:
export default CreateNew;