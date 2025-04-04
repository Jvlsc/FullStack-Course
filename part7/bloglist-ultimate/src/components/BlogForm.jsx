// Import Modules:
import { useState } from 'react'
import PropTypes from 'prop-types'

// Blog Form Component:
const BlogForm = ({ handleCreate }) => {
  // State Variables:
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  // Create New Blog:
  const addBlog = (event) => {
    event.preventDefault()
    handleCreate({ title: newTitle, author: newAuthor, url: newUrl })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  // Render:
  return (
    <div>
      <h3>Create New:</h3>
      <form onSubmit={addBlog}>
        <div>
          Title: &nbsp;
          <input
            id="title"
            data-testid="title-input"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div>
          Author: &nbsp;
          <input
            id="author"
            data-testid="author-input"
            type="text"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
          />
        </div>
        <div>
          URL: &nbsp;
          <input
            id="url"
            data-testid="url-input"
            type="text"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
          />
        </div>
        <button type="submit" data-testid="create-blog-button">
          Create
        </button>
      </form>
    </div>
  )
}

// Prop Types:
BlogForm.propTypes = {
  handleCreate: PropTypes.func.isRequired,
}

// Export Blog Form Component:
export default BlogForm
