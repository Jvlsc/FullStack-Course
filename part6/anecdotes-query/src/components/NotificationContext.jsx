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

  const setNotification = (message) => {
    if (notification) clearTimeout(timeoutRef.current)
    notificationDispatch({ type: 'SET_NOTIFICATION', payload: message })
    timeoutRef.current = setTimeout(() => { notificationDispatch({ type: 'CLEAR_NOTIFICATION' })}, 5000)
  }

  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext

