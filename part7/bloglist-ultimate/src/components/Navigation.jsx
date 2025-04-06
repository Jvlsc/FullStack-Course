// Import React Router:
import { Link } from 'react-router-dom'

// Import User Component:
import User from './User'

// Import Bootstrap Components:
import { Navbar, Nav, Container } from 'react-bootstrap'

// Navigation Component:
const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg" className="mb-4 px-4" fluid>
      <Navbar.Brand as={Link} to="/">BlogList</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/users">Users</Nav.Link>
        </Nav>
        <Nav>
          <User />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

// Export Navigation Component:
export default Navigation
