// Import React Hooks:
import { useState } from 'react'

// Import Redux Hooks:
import { useSelector } from 'react-redux'

// Import PropTypes:
import PropTypes from 'prop-types'

// Blog Details Body Component:
const BlogDetailsBody = ({ blog, toggleVisibility, handleUpdate, handleDelete }) => {
  return (
    <>
      {blog.title} &nbsp;
      <button onClick={toggleVisibility}>Hide</button>
      <ul>
        <li>{blog.url}</li>
        <li>
          <span data-testid="blog-likes-text">{blog.likes}</span> &nbsp;
          <button data-testid="blog-like-button" onClick={() => handleUpdate(blog)}>
            Like
          </button>
        </li>
        <li>{blog.author}</li>
        {blog.user.username === JSON.parse(window.localStorage.getItem('login')).username ? (
          <>
            <li>
              <button
                data-testid="blog-delete-button"
                onClick={() => handleDelete(blog.id)}
                style={{ backgroundColor: 'red', color: 'white' }}
              >
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
const Blog = ({ blog, handleUpdate, handleDelete }) => {
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
        <BlogDetailsBody
          blog={blog}
          toggleVisibility={toggleVisibility}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </li>
    </>
  )
}

// Blogs Component:
const Blogs = ({ handleUpdate, handleDelete }) => {
  const blogs = useSelector((state) => state.blogs)
  return (
    <div>
      <h3>List of Blogs:</h3>
      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} handleUpdate={handleUpdate} handleDelete={handleDelete} />
        ))}
      </ul>
    </div>
  )
}

// Prop Types - Blogs Component:
Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

// Prop Types - Blog Component:
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

// Prop Types - BlogDetailsBody Component:
BlogDetailsBody.propTypes = {
  blog: PropTypes.object.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

// Prop Types - BlogDetailsHeader Component:
BlogDetailsHeader.propTypes = {
  blog: PropTypes.object.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
}

// Export Blogs Component:
export default Blogs
