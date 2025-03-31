// Import Hooks and Services:
import { useState, useEffect, useRef } from 'react'

// Import Components:
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Login from './components/Login'
import User from './components/User'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

// Import Services:
import blogService from './services/blogs'
import loginService from './services/login'

// Constants:
const NOTIFICATION_TIMEOUT = 5000

// App Component:
const App = () => {
  // State Variables:
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  // Refs:
  const blogFormRef = useRef()
  
  // Helper function for notifications
  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), NOTIFICATION_TIMEOUT)
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
    blogService.getAll().then(blogs => setBlogs( blogs ))  
  }, [])

  // Login Handler:
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      console.log('Logging in...')
      const user = await loginService.login({ username, password })

      console.log('User logged in:', user)
      window.localStorage.setItem('login', JSON.stringify(user)) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showNotification(`User '${username}' logged in successfully!`, 'success')
    } catch (exception) {
      console.error(exception.response.data.error)
      showNotification(`User '${username}' login failed!`, 'error')
    }
  }

  // Logout Handler:
  const handleLogout = () => {
    window.localStorage.removeItem('login')
    setUser(null)
    showNotification('User logged out successfully!', 'success')
  }

  // Create Blog Handler:
  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      console.log('Creating blog...')
      const blogObject = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      }

      const newBlog = await blogService.create(blogObject)
 
      console.log('Blog created:', newBlog)
      setBlogs(blogs.concat(newBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      blogFormRef.current.toggleVisibility()
      showNotification(`Blog '${newBlog.title}' created successfully!`, 'success')
    } catch (exception) {
      console.error(exception.response.data.error)
      showNotification('Blog creation failed!', 'error')
    }
  }

  // Render:
  return (
    <div>
      {user === null 
        ? (<>
            <h2>Login:</h2>
            <Notification notification={notification} />
            <Login 
              username={username} 
              password={password} 
              setUsername={setUsername} 
              setPassword={setPassword} 
              handleLogin={handleLogin} 
            />
          </>)
        : (<>
            <h2>Blogs:</h2>
            <Notification notification={notification} />
            <User user={user.name} handleLogout={handleLogout} />
            <br />
            <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
              <BlogForm 
                newTitle={newTitle} 
                setNewTitle={setNewTitle} 
                newAuthor={newAuthor} 
                setNewAuthor={setNewAuthor} 
                newUrl={newUrl} 
                setNewUrl={setNewUrl} 
                handleCreate={handleCreate}
              />
            </Togglable>
            <br />
            <Blogs blogs={blogs} />
          </>)
      }
    </div>
  )
}

// Export App Component:
export default App