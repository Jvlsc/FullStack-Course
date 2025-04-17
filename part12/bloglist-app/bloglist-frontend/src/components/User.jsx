// Import Modules:
import PropTypes from 'prop-types'

// User Component:
const User = ({ user, handleLogout }) => (
  <div>
    <p>
      {user} logged in &nbsp;
      <button data-testid="logout-button" onClick={handleLogout}>Logout</button>
    </p>
  </div>
)

// Prop Types:
User.propTypes = {
  user: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
}

// Export User Component:
export default User
