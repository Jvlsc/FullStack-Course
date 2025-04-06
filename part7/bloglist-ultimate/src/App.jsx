// Import React Hooks:
import { useEffect } from 'react'

// Import React Router:
import { Routes, Route } from 'react-router-dom'

// Import Bootstrap Components:
import { Container } from 'react-bootstrap'

// Import Components:
import BlogView from './components/BlogView'
import HomeView from './components/HomeView'
import LoginForm from './components/LoginForm'
import Navigation from './components/Navigation'
import UserView from './components/UserView'
import UsersView from './components/UsersView'
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
      <Container fluid>
        <h2>Login:</h2>
        <Notification />
        <LoginForm />
      </Container>
    )
  }

  return (
    <>
      <Navigation />
      <Container>
        <h2>Blogs:</h2>
        <Notification />
        <br />
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/users" element={<UsersView />} />
          <Route path="/users/:id" element={<UserView />} />
          <Route path="/blogs/:id" element={<BlogView />} />
        </Routes>
      </Container>
    </>
  )
}

// Export App Component:
export default App
