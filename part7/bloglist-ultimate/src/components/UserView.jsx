// Import React Query:
import { useQuery } from '@tanstack/react-query'

// Import React Router:
import { useParams } from 'react-router-dom'

// Import Context Hooks:
import { useSessionClearDispatch } from '../contexts/SessionContext'

// Import Users Service:
import usersService from '../services/usersService'

// Import Components:
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'
import UserDetails from './UserDetails'
import UserBlogs from './UserBlogs'

// Import Bootstrap and FontAwesome components:
import { Row, Col } from 'react-bootstrap'

// User Component:
const User = () => {
  const { id } = useParams()

  const clearSessionDispatch = useSessionClearDispatch()

  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['users', id],
    queryFn: () => usersService.getById(id),
    onSuccess: (user) => {
      console.log('[UserViewComponent] User fetched:', user)
    },
    onError: (error) => {
      console.error('[UserViewComponent] Error fetching user:', error)
      if (error.response.status === 401 && error.message === 'Token Expired') {
        clearSessionDispatch()
      }
    },
  })

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <ErrorMessage message={`Failed to load user: ${error.message}`} />
  }

  console.log(user)
  return (
    <>
      <h2>User Profile:</h2>
      <br />
      <Row>
        <Col md={6} className="mb-3">
          <UserDetails user={user} />
        </Col>
        <Col md={6} className="mb-3">
          <UserBlogs user={user} />
        </Col>
      </Row>
    </>
  )
}

// Export User Component:
export default User