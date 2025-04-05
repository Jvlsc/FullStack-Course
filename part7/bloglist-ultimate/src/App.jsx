// Import React Hooks:
import { useEffect } from 'react'

// Import React Router:
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Import Components:
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import User from './components/User'
import Users from './components/Users'
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
      <h2>Blogs:</h2>
      <Notification />
      <User />
      <br />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  )
}

// Export App Component:
export default App
