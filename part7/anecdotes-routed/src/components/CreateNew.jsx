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

  const handleReset = () => {
    content.onReset()
    author.onReset()
    info.onReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content &nbsp;
          <input name='content' {...content} />
        </div>
        <div>
          author &nbsp;
          <input name='author' {...author} />
        </div>
        <div>
          info url &nbsp;
          <input name='info' {...info} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={handleReset}>reset</button>
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