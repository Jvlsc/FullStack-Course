// Import Hooks and Services:
import { useState, useEffect } from 'react'

// Import Components:
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Login from './components/Login'
import User from './components/User'

// Import Services:
import blogService from './services/blogs'
import loginService from './services/login'

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
    } catch (exception) {
      console.error(exception.response.data.error)
    }
  }

  // Logout Handler:
  const handleLogout = () => {
    window.localStorage.removeItem('login')
    setUser(null)
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
    } catch (exception) {
      console.error(exception.response.data.error)
    }
  }

  // Render:
  return (
    <div>
      {user === null 
        ? (<>
            <h2>Login:</h2>
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
            <User user={user.name} handleLogout={handleLogout} />
            <BlogForm 
              newTitle={newTitle} 
              setNewTitle={setNewTitle} 
              newAuthor={newAuthor} 
              setNewAuthor={setNewAuthor} 
              newUrl={newUrl} 
              setNewUrl={setNewUrl} 
              handleCreate={handleCreate}
            />
            <br />
            <Blogs blogs={blogs} />
          </>)
      }
    </div>
  )
}

// Export App Component:
export default App