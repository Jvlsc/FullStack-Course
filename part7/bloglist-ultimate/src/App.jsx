// Import React Hooks:
import { useEffect, useRef } from 'react'

// Import Redux Hooks:
import { useSelector, useDispatch } from 'react-redux'

// Import Reducer Functions:
import { getAllBlogs } from './reducers/blogsReducer'
import { showNotification } from './reducers/notificationReducer'
import { setSession } from './reducers/sessionReducer'

// Import Components:
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import User from './components/User'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

// Import Services:
import blogService from './services/blogs'

// App Component:
const App = () => {
  const user = useSelector((state) => state.session.username)
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  // Refs:
  const blogFormRef = useRef()

  // Effect Hook - Check User Session:
  useEffect(() => {
    const userJSON = window.localStorage.getItem('login')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      blogService.setToken(user.token)
      dispatch(setSession(user))
      dispatch(getAllBlogs())
    }
  }, [])

  // Update Blog Handler:
  const handleUpdate = async (blog) => {
    try {
      console.log('Updating blog...')
      const updatedBlog = await blogService.update(blog.id, { likes: blog.likes + 1 })
      setBlogs(blogs.map((blog) => (blog.id === updatedBlog.id ? { ...blog, likes: updatedBlog.likes } : blog)))
      dispatch(showNotification(`Blog '${updatedBlog.title}' updated successfully!`, 'success'))
    } catch (exception) {
      const errorMessage = exception.response.data.error
      console.error(errorMessage)
      dispatch(showNotification(`Blog '${blog.title}' update failed! ${errorMessage}`, 'error'))
    }
  }

  // Delete Blog Handler:
  const handleDelete = async (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id)
    if (!window.confirm(`Are you sure you want to delete "${blogToDelete.title}" blog?`)) {
      return
    }

    try {
      console.log('Deleting blog...')
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      dispatch(showNotification(`Blog '${blogToDelete.title}' deleted successfully!`, 'success'))
    } catch (exception) {
      const errorMessage = exception.response.data.error
      console.error(errorMessage)
      dispatch(showNotification(`Blog '${blogToDelete.title}' deletion failed! ${errorMessage}`, 'error'))
    }
  }

  // Sort Blogs by Likes:
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  console.log('Sorted blogs:', sortedBlogs)

  // Render:
  return (
    <div>
      {user === null || user === undefined ? (
        <>
          <h2>Login:</h2>
          <Notification />
          <LoginForm />
        </>
      ) : (
        <>
          <h2>Blogs:</h2>
          <Notification />
          <User />
          <br />
          <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
          <br />
          <Blogs blogs={sortedBlogs} handleUpdate={handleUpdate} handleDelete={handleDelete} />
        </>
      )}
    </div>
  )
}

// Export App Component:
export default App
