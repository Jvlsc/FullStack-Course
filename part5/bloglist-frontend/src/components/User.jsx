// User Component:
const User = ({ user, handleLogout }) => (
  <div>
    <p>
      {user} logged in &nbsp;
      <button onClick={handleLogout}>Logout</button>
    </p>
  </div>
)

// Export User Component:
export default User
