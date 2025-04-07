// Import React Query:
import { useQuery } from '@tanstack/react-query'

// Import React Router:
import { Link } from 'react-router-dom'

// Import Context Hooks:
import { useSessionClearDispatch } from '../contexts/SessionContext'

// Import Users Service:
import usersService from '../services/usersService'

// Import Components:
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'

// Import Bootstrap components:
import { Table, Card } from 'react-bootstrap'

// Users Component:
const Users = () => {
  const clearSessionDispatch = useSessionClearDispatch()

  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll,
    onSuccess: (users) => {
      console.log('[UsersViewComponent] Users fetched:', users)
    },
    onError: (error) => {
      console.error('[UsersViewComponent] Error fetching users:', error)
      if (error.response.status === 401 && error.message === 'Token Expired') {
        clearSessionDispatch()
      }
    },
  })

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <ErrorMessage message={`Failed to load users: ${error.message}`} />
  }

  return (
    <>
      <h2>Users List:</h2>
      <br />
      <Card className="users-card shadow-sm">
        <Card.Body>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Blogs Created</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                  <td>{user.username}</td>
                  <td>{user.blogs ? user.blogs.length : 0}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  )
}

// Export Users Component:
export default Users