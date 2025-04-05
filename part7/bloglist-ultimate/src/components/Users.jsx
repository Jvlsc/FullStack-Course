// Import React Query:
import { useQuery } from '@tanstack/react-query'

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
    <div>
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
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.blogs ? user.blogs.length : 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Export Users Component:
export default Users