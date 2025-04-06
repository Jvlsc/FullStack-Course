// Import React Router:
import { Link } from 'react-router-dom'

// Import Contexts Hooks:
import { useSessionUser, useSessionClearDispatch } from '../contexts/SessionContext'
import { useNotificationDispatch } from '../contexts/NotificationContext'

// Import Bootstrap Components:
import { NavDropdown } from 'react-bootstrap'

// Import Font Awesome:
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

// User Component:
const User = () => {
  const user = useSessionUser()
  const clearSessionDispatch = useSessionClearDispatch()
  const notificationDispatch = useNotificationDispatch()

  const handleLogout = () => {
    console.log('[UserComponent] Logging out...')
    clearSessionDispatch()
    notificationDispatch('User logged out successfully!', 'success')
  }

  if (!user) {
    return null
  }

  return (
    <NavDropdown id="user-dropdown" align="end" title={
      <span>
        <FontAwesomeIcon icon={faUser} className="me-1" />
        {user?.name}
      </span>
    }>
      <NavDropdown.Item as={Link} to={`/users/${user.id}`}>
        <FontAwesomeIcon icon={faUser} className="me-2" />
        Profile
      </NavDropdown.Item>
      <NavDropdown.Item onClick={handleLogout} data-testid="logout-button">
        <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
        Logout
      </NavDropdown.Item>
    </NavDropdown>
  )
}

// Export User Component:
export default User
