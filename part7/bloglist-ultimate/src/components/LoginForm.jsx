// Import Custom Hooks:
import useField from '../hooks/useField'

// Imports React Query Hooks:
import { useMutation, useQueryClient } from '@tanstack/react-query'

// Imports Redux Hooks:
import { useDispatch } from 'react-redux'

// Imports Notification Reducer:
import { showNotification } from '../reducers/notificationReducer'

// Imports Services:
import loginService from '../services/loginService'
import userService from '../services/userService'

// Login Component:
const Login = () => {
  const username = useField('text')
  const password = useField('password')

  const dispatch = useDispatch()

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: (newUser) => {
      console.log('[Login] User logged in:', newUser.username)
      userService.setUser(newUser)
      queryClient.setQueryData(['user'], newUser)
      dispatch(showNotification(`User "${newUser.username}" logged in`, 'success'))
    },
    onError: (error) => {
      console.error('[Login] Invalid username or password')
      dispatch(showNotification('Invalid username or password', 'error'))
    },
  })

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('[Login] Logging in...')
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
