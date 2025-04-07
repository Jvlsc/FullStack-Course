// Import React Router:
import { Link } from 'react-router-dom'

// Import Components:
import LikeBlog from './LikeBlog'
import DeleteBlog from './DeleteBlog'

// Import Bootstrap Components:
import { Card, ListGroup, Row, Col } from 'react-bootstrap'

// Import PropTypes:
import PropTypes from 'prop-types'


// Details Component:
const BlogDetails = ({ blog }) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('login')).username

  return (
    <Card className="mb-4 blog-details-card">
      <Card.Body className="d-flex flex-column">
        <h4 className="blog-form-title">{blog.title} by {blog.author}</h4>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>URL:</strong> <a href={blog.url}>{blog.url}</a>
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Added by:</strong> <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Likes: {blog.likes}</strong>
          </ListGroup.Item>
        </ListGroup>
        <div className="mt-auto pt-4">
          <Row className="g-2">
            <Col>
              <LikeBlog blog={blog} />
            </Col>
            {blog.user.username === loggedInUser && (
              <Col>
                <DeleteBlog blog={blog} />
              </Col>
            )}
          </Row>
        </div>
      </Card.Body>
    </Card>
  )
}

// Details Component Props:
BlogDetails.propTypes = {
  blog: PropTypes.object.isRequired,
}

// Export Details Component:
export default BlogDetails
