// Import Modules:
import { useState } from 'react'
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
          {blog.likes} &nbsp;
          <button onClick={() => handleUpdate(blog)}>Like</button>
        </li>
        <li>{blog.author}</li>
        <li><button onClick={() => handleDelete(blog.id)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button></li>
      </ul>
    </>
  )
}

// Blog Details Header Component:
const BlogDetailsHeader = ({ blog, toggleVisibility }) => {
  return (
    <>
      {blog.title} - {blog.author} &nbsp;
      <button onClick={toggleVisibility}>Show</button>
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
    marginBottom: '1rem'
  }

  // Toggle Visibility:
  const toggleVisibility = () => setVisible(!visible)

  // Render:
  return (
    <>
      <li style={hideWhenVisible} className="blog">
        <div className="blog-header">
          <BlogDetailsHeader blog={blog} toggleVisibility={toggleVisibility} />
        </div>
      </li>
      <li style={showWhenVisible} className="blog-details">
        <BlogDetailsBody blog={blog} toggleVisibility={toggleVisibility} handleUpdate={handleUpdate} handleDelete={handleDelete} />
      </li>
    </>
  )
}

// Blogs Component:
const Blogs = ({ blogs, handleUpdate, handleDelete }) => (
  <div>
    <h3>List of Blogs:</h3>
    <ul>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} handleUpdate={handleUpdate} handleDelete={handleDelete} />)}
    </ul>
  </div>
)

// Prop Types - Blogs Component:
Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

// Prop Types - Blog Component:
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

// Prop Types - BlogDetailsBody Component:
BlogDetailsBody.propTypes = {
  blog: PropTypes.object.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

// Prop Types - BlogDetailsHeader Component:
BlogDetailsHeader.propTypes = {
  blog: PropTypes.object.isRequired,
  toggleVisibility: PropTypes.func.isRequired
}

// Export Blogs Component:
export default Blogs