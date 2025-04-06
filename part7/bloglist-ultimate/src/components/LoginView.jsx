// Import Custom Components:
import LoginForm from './LoginForm'
import Notification from './Notification'

// LoginView Component:
const LoginView = () => {
  return (
    <div className="login-container">
      <div className="login-content">
        <Notification />
        <LoginForm />
      </div>
    </div>
  )
}

// Export LoginView Component:
export default LoginView
