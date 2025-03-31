// Import Hooks and Services:
import { useState, useEffect } from 'react'

// Import Components:
import Blogs from './components/Blogs'
import Login from './components/Login'

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
  
  // Effect Hook:
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
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Login failed: Wrong Credentials')
    }
  }

  // Render:
  return (
    <div>
      {user === null 
        ? (<Login 
            username={username} 
            password={password} 
            setUsername={setUsername} 
            setPassword={setPassword} 
            handleLogin={handleLogin} 
          />)
        : (<Blogs blogs={blogs} user={user.name} />)
      }
    </div>
  )
}

// Export App Component:
export default App