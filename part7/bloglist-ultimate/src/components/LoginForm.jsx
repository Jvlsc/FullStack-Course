// Imports React Query Hooks:
import { useMutation, useQueryClient } from '@tanstack/react-query'

// Import Contexts:
import { useNotificationDispatch } from '../contexts/NotificationContext'
import { useSessionSetDispatch, useSessionClearDispatch } from '../contexts/SessionContext'

// Imports Services:
import loginService from '../services/loginService'

// Import Custom Hooks:
import useField from '../hooks/useField'

// Login Component:
const Login = () => {
  const username = useField('text')
  const password = useField('password')

  const notificationDispatch = useNotificationDispatch()
  const setSessionDispatch = useSessionSetDispatch()
  const clearSessionDispatch = useSessionClearDispatch()

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: (newUser) => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      queryClient.setQueryData(['user'], newUser)
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
    <div>
      <form onSubmit={handleLogin}>
        <div>
          Username &nbsp;
          <input name="Username" data-testid="username-input" {...username} />
        </div>
        <div>
          Password &nbsp;&nbsp;
          <input name="Password" data-testid="password-input" {...password} />
        </div>
        <button type="submit" data-testid="login-button">
          Login
        </button>
      </form>
    </div>
  )
}

// Export Login Component:
export default Login
