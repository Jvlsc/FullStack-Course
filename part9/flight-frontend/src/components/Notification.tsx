// Import Types:
import { NotificationType } from '../types/notification';

// Prop Types:
type NotificationProps = {
  notification: NotificationType | null;
}

// Notification Component:
const Notification = ({ notification }: NotificationProps) => {
  if ( !notification ) return null
  
  return (
    <div style={{color: notification.type === 'error' ? 'red' : 'green', marginBottom: '1rem'}}>
      {notification.message}
    </div>
  )
}

// Export Notification Component:
export default Notification