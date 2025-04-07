import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if ( !notification ) {
    return null
  }
  return (
    <div style={{color: notification.type === 'error' ? 'red' : 'green'}}>
    {notification.message}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.object
}

export default Notification