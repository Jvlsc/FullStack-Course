// Import React Router:
import { Link, useNavigate } from 'react-router-dom'

// Import Bootstrap and FontAwesome components:
import { Card, ListGroup, Alert } from 'react-bootstrap'

// Import PropTypes:
import PropTypes from 'prop-types'

// User Blogs Component:
const UserBlogs = ({ user }) => {
  const navigate = useNavigate()

  const handleBlogClick = (blogId) => {
    navigate(`/blogs/${blogId}`)
  }

  return (
    <Card className="user-blogs-list-card shadow-sm h-100">
      <Card.Body className="user-blogs-list-body">
        <h4 className="user-blogs-list-title">Added Blogs:</h4>
        {user.blogs.length > 0 ? (
          <ListGroup variant="flush" className="user-blogs-list-group">
            {user.blogs.map(blog => (
              <ListGroup.Item
                key={blog.id}
                className="user-blogs-list-item d-flex justify-content-between align-items-center"
                onClick={() => handleBlogClick(blog.id)}
              >
                <Link to={`/blogs/${blog.id}`} className="text-decoration-none">
                  {blog.title}
                </Link>
                <div className="d-flex align-items-center gap-2">
                  <small className="text-muted">Author: {blog.author}</small>
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

