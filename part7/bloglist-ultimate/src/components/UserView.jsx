// Import React Query:
import { useQuery } from '@tanstack/react-query'

// Import React Router:
import { useParams } from 'react-router-dom'

// Import Context Hooks:
import { useSessionClearDispatch } from '../contexts/SessionContext'

// Import Users Service:
import usersService from '../services/usersService'

// User Component:
const User = () => {
  const { id } = useParams()

  const clearSessionDispatch = useSessionClearDispatch()

  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['users', id],
    queryFn: () => usersService.getById(id),
  })

  if (isLoading) {
    return <div>Loading user...</div>
  }

  if (isError) {
    console.error(`[UserViewComponent] Error fetching user: ${error}`)
    if (error.response.status === 401 && error.message === 'Token Expired') {
      clearSessionDispatch()
    }
    return <div className="error">Failed to load user: {error.message}</div>
  }

  return (
    <div>
      <h3>{user.name} ({user.username})</h3>
      <h4>Added Blogs</h4>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

// Export User Component:
export default User