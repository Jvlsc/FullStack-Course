// Import React Hooks:
import { useEffect } from 'react'

// Import React Router:
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Import Components:
import BlogView from './components/BlogView'
import HomeView from './components/HomeView'
import LoginForm from './components/LoginForm'
import User from './components/User'
import UsersView from './components/UsersView'
import UserView from './components/UserView'
import Notification from './components/Notification'

// Import Contexts Hooks:
import {
  useSessionUser,
  useSessionSetDispatch,
  useSessionGetDispatch,
  useSessionClearDispatch,
} from './contexts/SessionContext'

// App Component:
const App = () => {
  const user = useSessionUser()
  const setSessionDispatch = useSessionSetDispatch()
  const getSessionDispatch = useSessionGetDispatch()
  const clearSessionDispatch = useSessionClearDispatch()

  useEffect(() => {
    console.log('[AppComponent] Checking Session Status...')
    const session = getSessionDispatch()
    if (session) {
      console.log('[AppComponent] Session Active')
      setSessionDispatch(session)
    } else {
      console.log('[AppComponent] Session Inactive')
      clearSessionDispatch()
    }
  }, [])

  if (user === null || user === undefined) {
    return (
      <div>
        <h2>Login:</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <nav className='nav-bar'>
        <div className='nav-block-left'>
          <div className='nav-item'>
            <Link to="/">Home</Link>
          </div>
          <div className='nav-item'>
            <Link to="/users">Users</Link>
          </div>
        </div>
        <div className='nav-block-right'>
          <div className='nav-item'>
            <User />
          </div>
        </div>
      </nav>
      <h2>Blogs:</h2>
      <Notification />
      <br />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/users" element={<UsersView />} />
        <Route path="/users/:id" element={<UserView />} />
        <Route path="/blogs/:id" element={<BlogView />} />
      </Routes>
    </div>
  )
}

// Export App Component:
export default App
