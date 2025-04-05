// Imports React:
import { useEffect } from 'react'

// Imports Redux Hooks:
import { useSelector, useDispatch } from 'react-redux'

// Imports Reducer Functions:
import { hideNotification } from '../reducers/notificationReducer'

// Notification Component:
const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    if (notification && Object.keys(notification).length !== 0) {
      const timer = setTimeout(() => dispatch(hideNotification()), 5000)
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
