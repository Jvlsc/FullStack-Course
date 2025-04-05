// Import React Query:
import { useQuery } from '@tanstack/react-query'

// Import React Router:
import { Link } from 'react-router-dom'

// Import Users Service:
import usersService from '../services/usersService'

// Users Component:
const Users = () => {
  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll
  })

  if (isLoading) {
    return <div>Loading users...</div>
  }

  if (isError) {
    return <div className="error">Failed to load users: {error.message}</div>
  }

  return (
    <>
      <h3>Users</h3>
      <table>
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
      </table>
    </>
  )
}

// Export Users Component:
export default Users