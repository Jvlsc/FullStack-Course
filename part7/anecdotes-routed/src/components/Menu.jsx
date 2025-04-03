// Import Link Component:
import { Link } from 'react-router-dom'

// Menu Component:
const Menu = () => {
  const linkPadding = { paddingRight: 5 }

  return (
    <div>
      <Link style={linkPadding} to='/'>Anecdotes</Link>
      <Link style={linkPadding} to='/create'>Create New</Link>
      <Link style={linkPadding} to='/about'>About</Link>
    </div>
  )
}

// Export Menu Component:
export default Menu;