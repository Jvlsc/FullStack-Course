// Import React Hooks:
import { useEffect, useRef } from 'react'

// Import Redux Hooks:
import { useSelector, useDispatch } from 'react-redux'

// Import Reducer Functions:
import { getAllBlogs } from './reducers/blogsReducer'
import { showNotification } from './reducers/notificationReducer'
import { setSession } from './reducers/sessionReducer'

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
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  // Refs:
  const blogFormRef = useRef()

  // Effect Hook - Check User Session:
  useEffect(() => {
    const userJSON = window.localStorage.getItem('login')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      blogService.setToken(user.token)
      dispatch(setSession(user))
      dispatch(getAllBlogs())
    }
  }, [])

  // Render:
  return (
    <div>
      {user === null || user === undefined ? (
        <>
          <h2>Login:</h2>
          <Notification />
          <LoginForm />
        </>
      ) : (
        <>
          <h2>Blogs:</h2>
          <Notification />
          <User />
          <br />
          <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
          <br />
          <Blogs />
        </>
      )}
    </div>
  )
}

// Export App Component:
export default App
