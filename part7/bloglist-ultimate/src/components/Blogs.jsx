// Import React Hooks:
import { useState } from 'react'

// Import Redux Hooks:
import { useSelector, useDispatch } from 'react-redux'

// Import Reducer Functions:
import { voteBlog, deleteBlog } from '../reducers/blogsReducer'

// Import PropTypes:
import PropTypes from 'prop-types'

// Blog Details Body Component:
const BlogDetailsBody = ({ blog, toggleVisibility }) => {
  const dispatch = useDispatch()

  const handleVote = (blog) => dispatch(voteBlog(blog))
  const handleDelete = (blog) => dispatch(deleteBlog(blog))

  const deleteButtonStyle = {
    backgroundColor: 'red',
    color: 'white',
  }

  return (
    <>
      {blog.title} &nbsp;
      <button onClick={toggleVisibility}>Hide</button>
      <ul>
        <li>{blog.url}</li>
        <li>
          <span data-testid="blog-likes-text">{blog.likes}</span> &nbsp;
          <button data-testid="blog-like-button" onClick={() => handleVote(blog)}>
            Like
          </button>
        </li>
        <li>{blog.author}</li>
        {blog.user.username === JSON.parse(window.localStorage.getItem('login')).username ? (
          <>
            <li>
              <button style={deleteButtonStyle} data-testid="blog-delete-button" onClick={() => handleDelete(blog)}>
                Delete
              </button>
            </li>
          </>
        ) : null}
        <br />
      </ul>
    </>
  )
}

// Blog Details Header Component:
const BlogDetailsHeader = ({ blog, toggleVisibility }) => {
  return (
    <>
      {blog.title} - {blog.author} &nbsp;
      <button data-testid="blog-show-button" onClick={toggleVisibility}>
        Show
      </button>
    </>
  )
}

// Blog Component:
const Blog = ({ blog }) => {
  // State Variables:
  const [visible, setVisible] = useState(false)

  // Hide/Show Visibility:
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = {
    display: visible ? '' : 'none',
    marginTop: '1rem',
    marginBottom: '1rem',
  }

  // Toggle Visibility:
  const toggleVisibility = () => setVisible(!visible)

  // Render:
  return (
    <>
      <li style={hideWhenVisible} className="blog-header">
        <BlogDetailsHeader blog={blog} toggleVisibility={toggleVisibility} />
      </li>
      <li style={showWhenVisible} className="blog-details">
        <BlogDetailsBody blog={blog} toggleVisibility={toggleVisibility} />
      </li>
    </>
  )
}

// Blogs Component:
const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  console.log('Sorted blogs:', sortedBlogs)

  return (
    <div>
      <h3>List of Blogs:</h3>
      <ul>
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </div>
  )
}

// Prop Types - Blog Component:
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

// Prop Types - BlogDetailsHeader Component:
BlogDetailsHeader.propTypes = {
  blog: PropTypes.object.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
}

// Prop Types - BlogDetailsBody Component:
BlogDetailsBody.propTypes = {
  blog: PropTypes.object.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
}

// Export Blogs Component:
export default Blogs
