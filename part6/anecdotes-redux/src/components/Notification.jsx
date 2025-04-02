// Imports React:
import { useEffect } from 'react'

// Imports Redux Tools:
import { useSelector, useDispatch } from 'react-redux'

// Imports Reducer Functions:
import { clearNotification } from '../reducers/notificationReducer'

// Notification Component:
const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  // Effect to clear notification after 5 seconds:
  // This effect is triggered when the notification state changes.
  // Allow to clear the old notifications when a new one is set.
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)

      // Cleanup Function:
      return () => clearTimeout(timer)
    }
  }, [notification, dispatch])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <>
      {(notification !== null && notification !== '')
        ? (
          <>
            <div style={style}>
              {notification}
            </div>
            <br />
          </>
        )
        : null
      }
    </>
  )
}

// Export Notification Component:
export default Notification