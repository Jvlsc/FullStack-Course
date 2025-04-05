// Import Redux and Tanstack Hooks:
import { useDispatch } from 'react-redux'
import { useQueryClient, useQuery } from '@tanstack/react-query'

// Import Reducer Functions:
import { showNotification } from '../reducers/notificationReducer'

// Import Services:
import userService from '../services/userService'

// User Component:
const User = () => {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: userService.getUser
  })

  if (isLoading) {
    console.log('[User Component] Loading user...')
  }

  if (error) {
    console.error('[User Component] Error loading user:', error)
  }

  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  const handleLogout = () => {
    console.log('[User Component] Logging out...')
    userService.setUser(null)
    queryClient.setQueryData(['user'], null)
    dispatch(showNotification('User logged out successfully!', 'success'))
  }

  return (
    <div>
      <p>
        {user?.username} logged in &nbsp;
        <button data-testid="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </p>
    </div>
  )
}

// Export User Component:
export default User
