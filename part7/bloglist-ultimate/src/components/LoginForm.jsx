// Import Custom Hooks:
import useField from '../hooks/useField'

// Imports Redux Hooks:
import { useDispatch } from 'react-redux'

// Imports Reducer Functions:
import { login } from '../reducers/sessionReducer'

// Login Component:
const Login = () => {
  const username = useField('text')
  const password = useField('password')

  const dispatch = useDispatch()

  const submitLogin = (event) => {
    event.preventDefault()
    dispatch(login(username.value, password.value))
    username.onReset()
    password.onReset()
  }

  return (
    <div>
      <form onSubmit={submitLogin}>
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
