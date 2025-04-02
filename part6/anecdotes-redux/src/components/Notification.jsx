// Imports Redux Tools:
import { useSelector } from 'react-redux'

// Notification Component:
const Notification = () => {
  const notification = useSelector(state => state.notification)

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