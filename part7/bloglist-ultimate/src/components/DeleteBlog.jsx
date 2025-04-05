// Import Tanstack Hooks:
import { useMutation, useQueryClient } from '@tanstack/react-query'

// Import React Router:
import { useNavigate } from 'react-router-dom'

// Import Context Hooks:
import { useNotificationDispatch } from '../contexts/NotificationContext'

// Import Blog Service:
import blogService from '../services/blogsService'

// Import PropTypes:
import PropTypes from 'prop-types'

// Like Component:
const DeleteBlog = ({ blog }) => {
  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const deleteBlogMutation = useMutation({
    mutationFn: (blog) => blogService.remove(blog.id),
    onSuccess: (_, deletedBlog) => {
      console.log('[DeleteBlogComponent] Blog deleted:', deletedBlog)
      queryClient.setQueryData(['blogs'], (blogs) => blogs?.filter((blog) => blog.id !== deletedBlog.id) || [])
      notificationDispatch(`Blog '${deletedBlog.title}' deleted successfully!`, 'success')
      navigate('/')
    },
    onError: (error) => {
      console.error(`[DeleteBlogComponent] Error deleting blog: ${error}`)
      notificationDispatch(`Error deleting blog: ${error.message}`, 'error')
    },
  })

  const handleDelete = (blog) => {
    console.log(`[DeleteBlogComponent] Deleting blog: ${blog.title}...`)
    if (!window.confirm(`Are you sure you want to delete "${blog.title}" blog?`)) return
    deleteBlogMutation.mutate(blog)
  }

  const deleteButtonStyle = {
    backgroundColor: 'red',
    color: 'white',
  }

  return (
    <p>
      <button style={deleteButtonStyle} onClick={() => handleDelete(blog)}>Delete</button>
    </p>
  )
}

// Prop Types - Like Component:
DeleteBlog.propTypes = {
  blog: PropTypes.object.isRequired,
}

// Export Like Component:
export default DeleteBlog
