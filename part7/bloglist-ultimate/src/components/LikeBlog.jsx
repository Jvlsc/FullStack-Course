// Import Tanstack Hooks:
import { useMutation, useQueryClient } from '@tanstack/react-query'

// Import Context Hooks:
import { useNotificationDispatch } from '../contexts/NotificationContext'
import { useSessionClearDispatch } from '../contexts/SessionContext'

// Import Blog Service:
import blogService from '../services/blogsService'

// Import Bootstrap Components:
import { Button } from 'react-bootstrap'

// Import Font Awesome:
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

// Import PropTypes:
import PropTypes from 'prop-types'

// Like Component:
const LikeBlog = ({ blog }) => {
  const notificationDispatch = useNotificationDispatch()
  const clearSessionDispatch = useSessionClearDispatch()
  const queryClient = useQueryClient()

  const updateBlogMutation = useMutation({
    mutationFn: (updatedBlog) => blogService.update(updatedBlog.id, { likes: updatedBlog.likes + 1 }),
    onSuccess: (updatedBlog) => {
      console.log('[LikeComponent] Blog updated:', updatedBlog)
      queryClient.setQueryData(['blogs', updatedBlog.id], (blog) => updatedBlog)
      notificationDispatch(`Blog '${updatedBlog.title}' liked successfully!`, 'success')
    },
    onError: (error) => {
      console.error(`[LikeComponent] Error updating blog: ${error}`)
      notificationDispatch(`Error liking blog: ${error.message}`, 'error')
      if (error.response.status === 401 && error.message === 'Token Expired') {
        clearSessionDispatch()
      }
    },
  })

  const handleLike = (blog) => {
    console.log(`[LikeComponent] Liking blog: ${blog.title}...`)
    updateBlogMutation.mutate(blog)
  }

  return (
    <Button variant="success" className="w-100" onClick={() => handleLike(blog)}>
      <FontAwesomeIcon icon={faHeart} className="me-2" />
      Like
    </Button>
  )
}

// Prop Types - Like Component:
LikeBlog.propTypes = {
  blog: PropTypes.object.isRequired,
}

// Export Like Component:
export default LikeBlog
