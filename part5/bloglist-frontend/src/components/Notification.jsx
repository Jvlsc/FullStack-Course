// Import Hooks:
import { useState, forwardRef, useImperativeHandle } from 'react'

// Constants:
const NOTIFICATION_TIMEOUT = 5000

// Notification Component:
const Notification = forwardRef((props, ref) => {
  // State Variables:
  const [notification, setNotification] = useState(null)

  // Show Notification:
  const showNotification = (message, type) => {
    if (window.notificationTimeout) {
      clearTimeout(window.notificationTimeout)
    }

    setNotification({ message, type })
    window.notificationTimeout = setTimeout(() => setNotification(null), NOTIFICATION_TIMEOUT)
  }

  // Use Imperative Handle:
  useImperativeHandle(ref, () => {
    return {
      showNotification
    }
  })

  // Render:
  return (
    <>
      {notification === null
        ? null
        : <div className={notification.type === 'error' ? 'msg-error' : 'msg-success'}>
          {notification.message}
        </div>
      }
    </>
  )
})

// Display Name:
Notification.displayName = 'Notification'

// Export Notification Component:
export default Notification