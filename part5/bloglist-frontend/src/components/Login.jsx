// Login Component:
const Login = ({ username, password, setUsername, setPassword, handleLogin }) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
      <div>
        Username &nbsp;
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password &nbsp;&nbsp;
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

// Export Login Component:
export default Login
