// Import React Router:
import { Link } from 'react-router-dom'

// Import Components:
import LikeBlog from './LikeBlog'
import DeleteBlog from './DeleteBlog'

// Import Bootstrap Components:
import { Card, ListGroup, Row, Col } from 'react-bootstrap'

// Import FontAwesome:
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBlog, faHeart, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

// Import PropTypes:
import PropTypes from 'prop-types'

// Details Component:
const BlogDetails = ({ blog }) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('login')).username

  return (
    <Card className="mb-4 blog-details-card">
      <Card.Body className="d-flex flex-column">
        <h4 className="blog-details-title">{blog.title} by {blog.author}</h4>
        <div className="text-center my-2">
          <FontAwesomeIcon icon={faBlog} size="10x" />
        </div>
        <ListGroup variant="flush" className="mt-auto">
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <strong>URL:</strong> <a href={blog.url}>External Link <FontAwesomeIcon icon={faExternalLinkAlt} size="2xs" /></a>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <strong>Author:</strong> {blog.author}
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <strong>Added by:</strong> <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <strong>Likes: </strong> <span className="text-danger">{blog.likes || 0} <FontAwesomeIcon icon={faHeart} /></span>
          </ListGroup.Item>
        </ListGroup>
        <div className="mt-auto pt-">
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
