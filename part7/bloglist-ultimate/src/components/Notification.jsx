// Imports React:
import { useEffect } from 'react'

// Import Notification Context:
import { useNotificationValue, useNotificationDispatch } from '../contexts/NotificationContext'

// Notification Component:
const Notification = () => {
  const notification = useNotificationValue()
  const dispatch = useNotificationDispatch()

  useEffect(() => {
    if (notification && Object.keys(notification).length !== 0) {
      const timer = setTimeout(() => dispatch(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [notification, dispatch])

  if (notification === null || notification === '') return null

  return (
    <>
      <div className={`msg-${notification.type}`}>{notification.message}</div>
      <br />
    </>
  )
}

// Export Notification Component:
export default Notification
