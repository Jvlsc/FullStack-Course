// Import Custom Hooks:
import useField from '../hooks/useField'

// Import Redux Hooks:
import { useDispatch } from 'react-redux'

// Import Reducer Functions:
import { createBlog } from '../reducers/blogsReducer'

// Blog Form Component:
const BlogForm = ({ blogFormRef }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(createBlog({ title: title.value, author: author.value, url: url.value }))
    blogFormRef.current.toggleVisibility()
    title.onReset()
    author.onReset()
    url.onReset()
  }

  return (
    <div>
      <h3>Create New:</h3>
      <form onSubmit={addBlog}>
        <div>
          Title: &nbsp;
          <input id="title" data-testid="title-input" {...title} />
        </div>
        <div>
          Author: &nbsp;
          <input id="author" data-testid="author-input" {...author} />
        </div>
        <div>
          URL: &nbsp;
          <input id="url" data-testid="url-input" {...url} />
        </div>
        <button type="submit" data-testid="create-blog-button">
          Create
        </button>
      </form>
    </div>
  )
}

// Export Blog Form Component:
export default BlogForm
