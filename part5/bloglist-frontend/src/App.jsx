// Import Hooks and Services:
import { useState, useEffect } from 'react'

// Import Components:
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
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  
  // Effect Hook - Check User Session:
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('login')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
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
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Login failed: Wrong Credentials')
    }
  }

  // Logout Handler:
  const handleLogout = () => {
    window.localStorage.removeItem('login')
    setUser(null)
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
            <Blogs blogs={blogs} />
          </>)
      }
    </div>
  )
}

// Export App Component:
export default App