// Import Contexts:
import { useSessionUser, useSessionClear } from '../contexts/SessionContext'
import { useNotificationDispatch } from '../contexts/NotificationContext'

// User Component:
const User = () => {
  const user = useSessionUser()
  const clearSessionDispatch = useSessionClear()
  const notificationDispatch = useNotificationDispatch()

  const handleLogout = () => {
    console.log('[User Component] Logging out...')
    clearSessionDispatch()
    notificationDispatch('User logged out successfully!', 'success')
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
