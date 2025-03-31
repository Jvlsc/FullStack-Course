// Import Modules:
import { useState } from 'react'

// Blog Details Body Component:
const BlogDetailsBody = ({ blog, toggleVisibility, handleUpdate }) => {
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
const Blog = ({ blog, handleUpdate }) => {
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
      <li style={hideWhenVisible}>
        <BlogDetailsHeader blog={blog} toggleVisibility={toggleVisibility} />
      </li>
      <li style={showWhenVisible}>
        <BlogDetailsBody blog={blog} toggleVisibility={toggleVisibility} handleUpdate={handleUpdate} />
      </li>
    </>
  )
}

// Blogs Component:
const Blogs = ({ blogs, handleUpdate }) => (
  <div>
    <h3>List of Blogs:</h3>
    <ul>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} handleUpdate={handleUpdate} />)}
    </ul>
  </div>
)

// Export Blogs Component:
export default Blogs