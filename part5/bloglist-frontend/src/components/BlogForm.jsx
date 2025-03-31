// Import Modules:
import { useState } from 'react'

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
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div>
          Author: &nbsp;
          <input
            type="text"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
          />
        </div>
        <div>
          URL: &nbsp;
          <input
            type="text"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

// Export Blog Form Component:
export default BlogForm
