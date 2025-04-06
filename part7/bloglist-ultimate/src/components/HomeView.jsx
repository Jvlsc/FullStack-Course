// Import Components:
import Blogs from './Blogs'
import BlogForm from './BlogForm'

// Import Bootstrap components:
import { Row, Col } from 'react-bootstrap'

// Home Component:
const Home = () => {
  return (
    <>
      <h2>Blogs List:</h2>
      <br />
      <Row>
        <Col md={7}>
          <Blogs />
        </Col>
        <Col md={5}>
          <BlogForm />
        </Col>
      </Row>
    </>
  )
}

// Export Home Component:
export default Home