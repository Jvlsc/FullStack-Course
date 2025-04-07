// Import Tanstack Hooks:
import { useMutation, useQueryClient } from '@tanstack/react-query'

// Import Notification Context:
import { useNotificationDispatch } from '../contexts/NotificationContext'

// Import Custom Hook:
import useField from '../hooks/useField'

// Import Blog Service:
import blogService from '../services/blogsService'

// Import Bootstrap Components:
import { Card, ListGroup, Form, Button, InputGroup } from 'react-bootstrap'

// Import PropTypes:
import PropTypes from 'prop-types'

// Comments Form Component:
const CommentsForm = ({ blogId }) => {
  const comment = useField('text')

  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const createCommentMutation = useMutation({
    mutationFn: (comment) => blogService.createComment(blogId, comment),
    onSuccess: (newComment) => {
      console.log('[CommentsFormComponent] Comment created:', newComment)
      queryClient.setQueryData(['blogs', blogId], (blog) => {
        return { ...blog, comments: [...blog.comments, newComment] }
      })
      comment.onReset()
      notificationDispatch(`Comment added: '${newComment.content}'`, 'success')
    },
    onError: (exception) => {
      const errorMessage = exception.response.data.error
      console.error(errorMessage)
      notificationDispatch(`Comment creation failed! ${errorMessage}`, 'error')
    },
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('[CommentsFormComponent] Submitting comment...')
    createCommentMutation.mutate({ content: comment.value })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control
          id="comment"
          data-testid="comment-input"
          placeholder="Add a comment"
          {...comment}
        />
        <Button type="submit" data-testid="comment-button" variant="primary">
          Add Comment
        </Button>
      </InputGroup>
    </Form>
  )
}

// Blog Comments Component:
const BlogComments = ({ blog }) => {
  const sortedComments = blog.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  console.log('[BlogCommentsComponent] Sorted comments:', sortedComments)

  return (
    <Card className="mb-4 blog-comments-card">
      <Card.Body className="d-flex flex-column">
        <h4 className="blog-comments-title">Comments:</h4>
        <div className="mb-3">
          <CommentsForm blogId={blog.id} />
        </div>
        <br />
        {blog.comments.length > 0
          ? (
            <ListGroup variant='flush' className="blog-comments-list">
              {sortedComments.map((comment) => (
                <ListGroup.Item key={comment.id}>
                  <strong>Anonymous:</strong> {comment.content}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <ListGroup variant='flush' className="blog-comments-list">
              <ListGroup.Item>
                No comments yet. Be the first to comment!
              </ListGroup.Item>
            </ListGroup>
          )
        }
      </Card.Body>
    </Card>
  )
}

// Comments Form Component Props:
CommentsForm.propTypes = {
  blogId: PropTypes.string.isRequired,
}

// Blog Comments Component Props:
BlogComments.propTypes = {
  blog: PropTypes.object.isRequired,
}

// Export Blog Comments Component:
export default BlogComments
