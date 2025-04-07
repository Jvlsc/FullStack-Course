// Import Bootstrap and FontAwesome components:
import { Card, ListGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBlog } from '@fortawesome/free-solid-svg-icons'

// Import PropTypes:
import PropTypes from 'prop-types'

// User Details Component:
const UserDetails = ({ user }) => {
  return (
    <Card className="user-details-card shadow-sm h-100">
      <Card.Body className="d-flex flex-column">
        <h4 className="user-details-title">User Information:</h4>
        <div className="text-center my-2">
          <FontAwesomeIcon icon={faUser} size="10x" />
        </div>
        <div className="mt-auto">
          <ListGroup variant="flush">
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <strong>Name:</strong>
              <span>{user.name}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <strong>Username:</strong>
              <span>{user.username}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <strong>User ID:</strong>
              <span>{user.id}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <strong>Created at:</strong>
              <span>
                {new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }).format(new Date(user.createdAt))}
              </span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <strong>Blogs created:</strong>
              <span>{user.blogs.length} Blogs &nbsp; <FontAwesomeIcon icon={faBlog} /></span>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </Card.Body>
    </Card>
  )
}

// User Details Component PropTypes:
UserDetails.propTypes = {
  user: PropTypes.object.isRequired
}

// Export User Details Component:
export default UserDetails

