// Imports Redux Tools:
import { useSelector } from 'react-redux'

// Notification Component:
const Notification = () => {
  // React Redux Hooks:
  const notification = useSelector(state => state.notification)

  // Style:
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  // Render:
  return (
    <div style={style}>
      render here notification...
    </div>
  )
}

// Export Notification Component:
export default Notification