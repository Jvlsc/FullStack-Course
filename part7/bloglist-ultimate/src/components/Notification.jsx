// Import Context Hooks:
import { useNotificationValue } from '../contexts/NotificationContext'

// Import Bootstrap Components:
import { Alert } from 'react-bootstrap'

// Notification Component:
const Notification = () => {
  const notification = useNotificationValue()

  if (notification === null || notification === '') {
    return null
  }

  return (
    <Alert
      variant={notification.type === 'success' ? 'success' : 'danger'}
      className="notification-alert"
      dismissible
    >
      {notification.message}
    </Alert>
  )
}

// Export Notification Component:
export default Notification
