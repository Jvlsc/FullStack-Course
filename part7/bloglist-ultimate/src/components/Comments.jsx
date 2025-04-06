// Import PropTypes:
import PropTypes from 'prop-types'

// Comments Component:
const Comments = ({ blog }) => {
  const commentStyle = {
    marginBottom: '0.5rem',
  }

  return (
    <>
      <h3>Comments:</h3>
      {blog.comments.length > 0
        ? (
          <ul>
            {blog.comments.map((comment) => (
              <li style={commentStyle} key={comment.id}>{comment.content}</li>
            ))}
          </ul>
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )
      }
    </>
  )
}

// Comments Component Props:
Comments.propTypes = {
  blog: PropTypes.object.isRequired,
}

// Export Comments Component:
export default Comments
