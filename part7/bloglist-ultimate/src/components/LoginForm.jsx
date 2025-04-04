// Import Modules:
import { useState } from 'react'
import PropTypes from 'prop-types'

// Login Component:
const Login = ({ handleLogin }) => {
  // State Variables:
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Summit Login:
  const submitLogin = (event) => {
    event.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  // Render:
  return (
    <div>
      <form onSubmit={submitLogin}>
        <div>
          Username &nbsp;
          <input
            type="text"
            value={username}
            name="Username"
            data-testid="username-input"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password &nbsp;&nbsp;
          <input
            type="password"
            value={password}
            name="Password"
            data-testid="password-input"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" data-testid="login-button">
          Login
        </button>
      </form>
    </div>
  )
}

// Prop Types:
Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

// Export Login Component:
export default Login
