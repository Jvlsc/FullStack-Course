// Import React Query:
import { useQuery } from '@tanstack/react-query'

// Import React Router:
import { useParams, Link } from 'react-router-dom'

// Import Context Hooks:
import { useSessionClearDispatch } from '../contexts/SessionContext'

// Import Users Service:
import usersService from '../services/usersService'

// Import Components:
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'

// Import Bootstrap components:
import { ListGroup, Card, Row, Col, Alert } from 'react-bootstrap'

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

  return (
    <>
      <h2>User Profile:</h2>
      <br />
      <Row>
        <Col md={6} className="mb-3">
          <Card className="shadow-sm h-100">
            <Card.Header as="h4" className="bg-light">User Information:</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <strong>Name:</strong>
                  <span>{user.name}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  <strong>Username:</strong>
                  <span>{user.username}</span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-3">
          <Card className="shadow-sm h-100">
            <Card.Header as="h4" className="bg-light">Added Blogs:</Card.Header>
            <Card.Body>
              {user.blogs.length > 0 ? (
                <ListGroup variant="flush">
                  {user.blogs.map(blog => (
                    <ListGroup.Item key={blog.id} className="d-flex justify-content-between align-items-center">
                      <Link to={`/blogs/${blog.id}`} className="text-decoration-none">
                        {blog.title}
                      </Link>
                      <small className="text-muted">Autor: {blog.author}</small>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <Alert variant="info">No blogs added yet.</Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

// Export User Component:
export default User