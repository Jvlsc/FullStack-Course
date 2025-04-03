// Import PropTypes:
import PropTypes from 'prop-types'

// Notification Component:
const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  return (
    <div>
      {notification}
    </div>
  )
}

// Prop Types - Notification Component:
Notification.propTypes = {
  notification: PropTypes.string.isRequired
}

// Export Notification Component:
export default Notification;
