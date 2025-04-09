// Import React:
import { useState, useEffect } from 'react'

// Import Apollo Hooks & Queries:
import { useMutation } from '@apollo/client'
import { LOGIN } from '../services/queries'

// Import Proptypes:
import PropTypes from 'prop-types'

// Login Form Component:
const LoginForm = ({ notification, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log('[GraphQL] Error Logging In: ', error.message)
      notification(`Error Logging In: ${error.message}`, 'error')
    }
  })

  useEffect(() => {
    if ( result.data ) {
      console.log('[GraphQL] Logging In Successfully!')
      const token = result.data.loginUser.value
      localStorage.setItem('library-user-token', token)
      setToken(token)
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()
    console.log('[GraphQL] Logging In...')
    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

// Login Form Component Proptypes:
LoginForm.propTypes = {
  notification: PropTypes.func,
  setToken: PropTypes.func
}

// Export Login Form Component:
export default LoginForm