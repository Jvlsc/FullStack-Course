// Imports React Query Hooks:
import { useMutation } from '@tanstack/react-query'

// Import Contexts:
import { useNotificationDispatch } from '../contexts/NotificationContext'
import { useSessionSetDispatch, useSessionClearDispatch } from '../contexts/SessionContext'

// Imports Services:
import loginService from '../services/loginService'

// Import Custom Hooks:
import useField from '../hooks/useField'

// Import Bootstrap Components:
import { Card, Form, Button } from 'react-bootstrap'

// Login Component:
const Login = () => {
  const username = useField('text')
  const password = useField('password')

  const notificationDispatch = useNotificationDispatch()
  const setSessionDispatch = useSessionSetDispatch()
  const clearSessionDispatch = useSessionClearDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: (newUser) => {
      console.log('[LoginFormComponent] User logged in:', newUser.username)
      setSessionDispatch(newUser)
      notificationDispatch(`User "${newUser.username}" logged in`, 'success')
    },
    onError: (error) => {
      console.error('[LoginFormComponent] Invalid username or password')
      clearSessionDispatch()
      notificationDispatch('Invalid username or password', 'error')
    },
  })

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('[LoginFormComponent] Logging in...')
    newAnecdoteMutation.mutate({ username: username.value, password: password.value })
    password.onReset()
  }

  return (
    <Card className="login-card shadow">
      <Card.Body className="login-card-body d-flex flex-column justify-content-center">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please login to your account</p>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-4">
            <Form.Label className="login-form-label">Username</Form.Label>
            <Form.Control
              name="Username"
              data-testid="username-input"
              className="login-form-control"
              {...username}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="login-form-label">Password</Form.Label>
            <Form.Control
              name="Password"
              data-testid="password-input"
              className="login-form-control"
              {...password}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            data-testid="login-button"
            className="login-button"
          >
            Login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

// Export Login Component:
export default Login
