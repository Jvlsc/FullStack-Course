import { Navbar } from 'react-bootstrap'

const Footer = () => {
  return (
    <Navbar fixed="bottom" bg="light" className="footer">
      <div className="container d-flex justify-content-center align-items-center">
        <small className="text-muted">© {new Date().getFullYear()} BlogList App by Javier Velasco</small>
      </div>
    </Navbar>
  )
}

export default Footer