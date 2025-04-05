// Import React Hooks:
import { useRef, useEffect } from 'react'

// Import Components:
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import User from './components/User'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

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

  const blogFormRef = useRef()

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
      <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <br />
      <Blogs />
    </div>
  )
}

// Export App Component:
export default App
