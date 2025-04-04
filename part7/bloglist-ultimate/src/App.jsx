// Import React Hooks:
import { useState, useEffect, useRef } from 'react'

// Import Redux Hooks:
import { useDispatch } from 'react-redux'

// Import Reducer Functions:
import { setNotification } from './reducers/notificationReducer'

// Import Components:
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import User from './components/User'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

// Import Services:
import blogService from './services/blogs'
import loginService from './services/login'

// App Component:
const App = () => {
  // State Variables:
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  // Dispatch:
  const dispatch = useDispatch()

  // Refs:
  const blogFormRef = useRef()

  // Effect Hook - Check User Session:
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('login')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  // Effect Hook - Get All Blogs:
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  // Login Handler:
  const handleLogin = async (userObject) => {
    try {
      console.log('Logging in...')
      const user = await loginService.login(userObject)

      console.log('User logged in:', user)
      window.localStorage.setItem('login', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)

      dispatch(
        setNotification({
          message: `User '${userObject.username}' logged in successfully!`,
          type: 'success',
        })
      )
    } catch (exception) {
      const errorMessage = exception.response.data.error
      console.error(errorMessage)

      dispatch(
        setNotification({
          message: `User '${userObject.username}' login failed! ${errorMessage}`,
          type: 'error',
        })
      )
    }
  }

  // Logout Handler:
  const handleLogout = () => {
    window.localStorage.removeItem('login')
    setUser(null)

    dispatch(
      setNotification({
        message: 'User logged out successfully!',
        type: 'success',
      })
    )
  }

  // Create Blog Handler:
  const handleCreate = async (blogObject) => {
    try {
      console.log('Creating blog...')
      const newBlog = await blogService.create(blogObject)

      console.log('Blog created:', newBlog)

      // Fix populate mismatch:
      const user = JSON.parse(window.localStorage.getItem('login'))
      newBlog.user = {
        id: newBlog.user,
        name: user.name,
        username: user.username,
      }
      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.toggleVisibility()

      dispatch(
        setNotification({
          message: `Blog '${newBlog.title}' created successfully!`,
          type: 'success',
        })
      )
    } catch (exception) {
      const errorMessage = exception.response.data.error
      console.error(errorMessage)

      dispatch(
        setNotification({
          message: `Blog '${blogObject.title}' creation failed! ${errorMessage}`,
          type: 'error',
        })
      )
    }
  }

  // Update Blog Handler:
  const handleUpdate = async (blog) => {
    try {
      console.log('Updating blog...')
      const updatedBlog = await blogService.update(blog.id, { likes: blog.likes + 1 })
      setBlogs(blogs.map((blog) => (blog.id === updatedBlog.id ? { ...blog, likes: updatedBlog.likes } : blog)))

      dispatch(
        setNotification({
          message: `Blog '${updatedBlog.title}' updated successfully!`,
          type: 'success',
        })
      )
    } catch (exception) {
      const errorMessage = exception.response.data.error
      console.error(errorMessage)

      dispatch(
        setNotification({
          message: `Blog '${blog.title}' update failed! ${errorMessage}`,
          type: 'error',
        })
      )
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
      dispatch(
        setNotification({
          message: `Blog '${blogToDelete.title}' deleted successfully!`,
          type: 'success',
        })
      )
    } catch (exception) {
      const errorMessage = exception.response.data.error
      console.error(errorMessage)
      dispatch(
        setNotification({
          message: `Blog '${blogToDelete.title}' deletion failed! ${errorMessage}`,
          type: 'error',
        })
      )
    }
  }

  // Sort Blogs by Likes:
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  console.log('Sorted blogs:', sortedBlogs)

  // Render:
  return (
    <div>
      {user === null ? (
        <>
          <h2>Login:</h2>
          <Notification />
          <LoginForm handleLogin={handleLogin} />
        </>
      ) : (
        <>
          <h2>Blogs:</h2>
          <Notification />
          <User user={user.name} handleLogout={handleLogout} />
          <br />
          <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
            <BlogForm handleCreate={handleCreate} />
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
