// Import React Hooks:
import { useEffect, useRef } from 'react'

// Import Redux and Tanstack Hooks:
import { useDispatch } from 'react-redux'
import { useQueryClient, useQuery } from '@tanstack/react-query'

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
import userService from './services/userService'

// App Component:
const App = () => {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: userService.getUser
  })

  if (isLoading) {
    console.log('[App Component] Loading user...')
  }

  if (error) {
    console.error('[App Component] Error loading user:', error)
  }

  const blogFormRef = useRef()

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
