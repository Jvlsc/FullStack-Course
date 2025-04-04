// Import Redux Hooks:
import { useSelector, useDispatch } from 'react-redux'

// Import Reducer Functions:
import { logout } from '../reducers/sessionReducer'

// User Component:
const User = () => {
  const user = useSelector((state) => state.session.username)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <p>
        {user} logged in &nbsp;
        <button data-testid="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </p>
    </div>
  )
}

// Export User Component:
export default User
