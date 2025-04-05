// Import React Hooks:
import { useRef, useEffect } from 'react'

// Import Components:
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import User from './components/User'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

// Import Contexts:
import { useSessionUser, useSessionSet, useSessionGet, useSessionClear } from './contexts/SessionContext'

// App Component:
const App = () => {
  const user = useSessionUser()
  const setSession = useSessionSet()
  const getSession = useSessionGet()
  const clearSession = useSessionClear()

  const blogFormRef = useRef()

  useEffect(() => {
    const session = getSession()
    if (session) setSession(session)
    else clearSession()
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
