// Import Tanstack Hooks:
import { useMutation, useQueryClient } from '@tanstack/react-query'

// Import Notification Context:
import { useNotificationDispatch } from '../contexts/NotificationContext'

// Import Custom Hook:
import useField from '../hooks/useField'

// Import Blog Service:
import blogService from '../services/blogsService'

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
    <form onSubmit={handleSubmit}>
      <input id="comment" data-testid="comment-input" placeholder="Add a comment" {...comment} />
      <button type="submit" data-testid="comment-button">
        Add Comment
      </button>
    </form>
  )
}

// Comments Component:
const Comments = ({ blog }) => {
  const commentStyle = {
    marginBottom: '0.5rem',
  }

  return (
    <>
      <h3>Comments:</h3>
      <CommentsForm blogId={blog.id} />
      <br />
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

// Comments Form Component Props:
CommentsForm.propTypes = {
  blogId: PropTypes.string.isRequired,
}

// Comments Component Props:
Comments.propTypes = {
  blog: PropTypes.object.isRequired,
}

// Export Comments Component:
export default Comments
