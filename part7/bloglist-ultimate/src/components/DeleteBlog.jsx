// Import Tanstack Hooks:
import { useMutation, useQueryClient } from '@tanstack/react-query'

// Import React Router:
import { useNavigate } from 'react-router-dom'

// Import Context Hooks:
import { useNotificationDispatch } from '../contexts/NotificationContext'
import { useSessionClearDispatch } from '../contexts/SessionContext'

// Import Blog Service:
import blogService from '../services/blogsService'

// Import Bootstrap Components:
import { Button } from 'react-bootstrap'

// Import Font Awesome:
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

// Import PropTypes:
import PropTypes from 'prop-types'

// Delete Component:
const DeleteBlog = ({ blog }) => {
  const notificationDispatch = useNotificationDispatch()
  const clearSessionDispatch = useSessionClearDispatch()

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const deleteBlogMutation = useMutation({
    mutationFn: (blog) => blogService.remove(blog.id),
    onSuccess: (_, deletedBlog) => {
      console.log('[DeleteBlogComponent] Blog deleted:', deletedBlog)
      queryClient.invalidateQueries({ queryKey: ['blogs', deletedBlog.id] })
      notificationDispatch(`Blog '${deletedBlog.title}' deleted successfully!`, 'success')
      navigate('/')
    },
    onError: (error) => {
      console.error(`[DeleteBlogComponent] Error deleting blog: ${error}`)
      notificationDispatch(`Error deleting blog: ${error.message}`, 'error')
      if (error.response.status === 401) {
        clearSessionDispatch()
      }
    },
  })

  const handleDelete = (blog) => {
    console.log(`[DeleteBlogComponent] Deleting blog: ${blog.title}...`)
    if (!window.confirm(`Are you sure you want to delete "${blog.title}" blog?`)) return
    deleteBlogMutation.mutate(blog)
  }

  return (
    <Button variant="danger" className="w-100" onClick={() => handleDelete(blog)}>
      <FontAwesomeIcon icon={faTrash} className="me-2" />
      Delete
    </Button>
  )
}

// Prop Types - Delete Component:
DeleteBlog.propTypes = {
  blog: PropTypes.object.isRequired,
}

// Export Delete Component:
export default DeleteBlog
