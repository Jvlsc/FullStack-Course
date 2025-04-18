// Notification Component:
const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  return (
    <div className={notification.type === 'error' ? 'msg-error' : 'msg-success'}>
      {notification.message}
    </div>
  )
}

export default Notification