// Import React Hooks:
import { useEffect, useRef } from 'react'

// Import Redux Hooks:
import { useSelector, useDispatch } from 'react-redux'

// Import Reducer Functions:
import { getAllBlogs } from './reducers/blogsReducer'
import { setSession, clearSession } from './reducers/sessionReducer'

// Import Components:
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import User from './components/User'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

// Import Services:
import blogService from './services/blogs'

// App Component:
const App = () => {
  const user = useSelector((state) => state.session.username)
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    console.log('[App Component] Checking user session...')
    const userJSON = window.localStorage.getItem('login')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      console.log('[App Component] User session found:', user.username)
      blogService.setToken(user.token)
      dispatch(setSession(user))
      dispatch(getAllBlogs())
    } else {
      console.log('[App Component] No user session found.')
      dispatch(clearSession())
    }
  }, [user, dispatch])

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
