// Import Context Hooks:
import { useNotificationValue } from '../contexts/NotificationContext'

// Notification Component:
const Notification = () => {
  const notification = useNotificationValue()

  if (notification === null || notification === '') {
    return null
  }

  return (
    <>
      <div className={`msg-${notification.type}`}>{notification.message}</div>
      <br />
    </>
  )
}

// Export Notification Component:
export default Notification
