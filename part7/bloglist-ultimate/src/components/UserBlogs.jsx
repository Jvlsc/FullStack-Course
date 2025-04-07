// Import React Router:
import { Link } from 'react-router-dom'

// Import Bootstrap and FontAwesome components:
import { Card, ListGroup, Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

// Import PropTypes:
import PropTypes from 'prop-types'

// User Blogs Component:
const UserBlogs = ({ user }) => {
  return (
    <Card className="users-card shadow-sm h-100">
      <Card.Body>
        <h4 className="user-blogs-list-title">Added Blogs:</h4>
        {user.blogs.length > 0 ? (
          <ListGroup variant="flush" className="user-blogs-list">
            {user.blogs.map(blog => (
              <ListGroup.Item key={blog.id} className="blog-header d-flex justify-content-between align-items-center">
                <Link to={`/blogs/${blog.id}`} className="text-decoration-none">
                  {blog.title}
                </Link>
                <div className="d-flex align-items-center gap-2">
                  <small className="text-muted">Author: {blog.author}</small>
                  <span className="text-danger">
                    <FontAwesomeIcon icon={faHeart} /> {blog.likes || 0}
                  </span>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <Alert variant="info">No blogs added yet.</Alert>
        )}
      </Card.Body>
    </Card>
  )
}

// User Blogs Component PropTypes:
UserBlogs.propTypes = {
  user: PropTypes.object.isRequired
}

// Export User Blogs Component:
export default UserBlogs

