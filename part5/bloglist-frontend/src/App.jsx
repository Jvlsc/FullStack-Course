// Import Hooks and Services:
import { useState, useEffect, useRef } from 'react'

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

  // Refs:
  const blogFormRef = useRef()
  const notificationRef = useRef()

  // Helper function for notifications
  const showNotification = (message, type) => {
    notificationRef.current.showNotification(message, type)
  }

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
    blogService.getAll().then(blogs => setBlogs(blogs))
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

      showNotification(`User '${userObject.username}' logged in successfully!`, 'success')
    } catch (exception) {
      const errorMessage = exception.response.data.error
      console.error(errorMessage)
      showNotification(`User '${userObject.username}' login failed! ${errorMessage}`, 'error')
    }
  }

  // Logout Handler:
  const handleLogout = () => {
    window.localStorage.removeItem('login')
    setUser(null)
    showNotification('User logged out successfully!', 'success')
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
        username: user.username
      }
      setBlogs(blogs.concat(newBlog))

      blogFormRef.current.toggleVisibility()
      showNotification(`Blog '${newBlog.title}' created successfully!`, 'success')
    } catch (exception) {
      const errorMessage = exception.response.data.error
      console.error(errorMessage)
      showNotification(`Blog '${blogObject.title}' creation failed! ${errorMessage}`, 'error')
    }
  }

  // Update Blog Handler:
  const handleUpdate = async (blog) => {
    try {
      console.log('Updating blog...')
      const updatedBlog = await blogService.update(blog.id, { likes: blog.likes + 1 })

      setBlogs(blogs.map(blog => blog.id === updatedBlog.id
        ? { ...blog, likes: updatedBlog.likes }
        : blog
      ))

      showNotification(`Blog '${updatedBlog.title}' updated successfully!`, 'success')
    } catch (exception) {
      const errorMessage = exception.response.data.error
      console.error(errorMessage)
      showNotification(`Blog '${blog.title}' update failed! ${errorMessage}`, 'error')
    }
  }

  // Delete Blog Handler:
  const handleDelete = async (id) => {
    const blogToDelete = blogs.find(blog => blog.id === id)
    if (!window.confirm(`Are you sure you want to delete "${blogToDelete.title}" blog?`)) {
      return
    }

    try {
      console.log('Deleting blog...')
      await blogService.remove(id)

      setBlogs(blogs.filter(blog => blog.id !== id))

      showNotification(`Blog '${blogToDelete.title}' deleted successfully!`, 'success')
    } catch (exception) {
      const errorMessage = exception.response.data.error
      console.error(errorMessage)
      showNotification(`Blog '${blogToDelete.title}' deletion failed! ${errorMessage}`, 'error')
    }
  }

  // Sort Blogs by Likes:
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  console.log('Sorted blogs:', sortedBlogs)

  // Render:
  return (
    <div>
      {user === null
        ? (
          <>
            <h2>Login:</h2>
            <Notification ref={notificationRef} />
            <LoginForm handleLogin={handleLogin} />
          </>
        )
        : (
          <>
            <h2>Blogs:</h2>
            <Notification ref={notificationRef} />
            <User user={user.name} handleLogout={handleLogout} />
            <br />
            <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
              <BlogForm handleCreate={handleCreate} />
            </Togglable>
            <br />
            <Blogs blogs={sortedBlogs} handleUpdate={handleUpdate} handleDelete={handleDelete} />
          </>
        )
      }
    </div>
  )
}

// Export App Component:
export default App