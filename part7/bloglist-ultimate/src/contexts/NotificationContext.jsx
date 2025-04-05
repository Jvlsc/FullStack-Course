// Import React:
import { createContext, useReducer, useContext, useRef } from 'react'

// Import PropTypes:
import PropTypes from 'prop-types'

// Create a Notification Reducer:
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

// Create a Notification Context:
const NotificationContext = createContext()

// Create a Notification Context Provider:
export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  const timeoutRef = useRef(null)

  const setNotification = (message, type) => {
    console.log(`[NotificationContext] Setting notification: ${message} (${type})`)
    if (notification) clearTimeout(timeoutRef.current)
    notificationDispatch({ type: 'SET_NOTIFICATION', payload: { message, type } })

    timeoutRef.current = setTimeout(() => {
      console.log('[NotificationContext] Clearing notification')
      notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

// Export Notification Context:
export const useNotificationContext = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationContextProvider')
  }
  return context
}

// Export Notification Value Hook:
export const useNotificationValue = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotificationValue must be used within a NotificationProvider')
  }
  return context[0]
}

// Export Notification Dispatch Hook:
export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotificationDispatch must be used within a NotificationProvider')
  }
  return context[1]
}

// Export Notification Context:
export default NotificationContext
