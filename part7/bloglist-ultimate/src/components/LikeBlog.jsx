// Import Tanstack Hooks:
import { useMutation, useQueryClient } from '@tanstack/react-query'

// Import Context Hooks:
import { useNotificationDispatch } from '../contexts/NotificationContext'

// Import Blog Service:
import blogService from '../services/blogsService'

// Import PropTypes:
import PropTypes from 'prop-types'

// Like Component:
const LikeBlog = ({ blog }) => {
  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const updateBlogMutation = useMutation({
    mutationFn: (updatedBlog) => blogService.update(updatedBlog.id, { likes: updatedBlog.likes + 1 }),
    onSuccess: (updatedBlog) => {
      console.log('[LikeComponent] Blog updated:', updatedBlog)
      queryClient.invalidateQueries({ queryKey: ['blogs'] })

      const fixedBlog = blogService.fixPopulateMismatch(updatedBlog)
      queryClient.setQueryData(['blogs'], (blogs) =>
        blogs?.map((blog) => (blog.id === fixedBlog.id ? fixedBlog : blog)) || [fixedBlog]
      )

      notificationDispatch(`Blog '${fixedBlog.title}' liked successfully!`, 'success')
    },
    onError: (error) => {
      console.error(`[LikeComponent] Error updating blog: ${error}`)
      notificationDispatch(`Error liking blog: ${error.message}`, 'error')
    },
  })

  const handleLike = (blog) => {
    console.log(`[LikeComponent] Liking blog: ${blog.title}...`)
    updateBlogMutation.mutate(blog)
  }

  return (
    <p>
      Likes: {blog.likes} &nbsp;
      <button onClick={() => handleLike(blog)}>Like</button>
    </p>
  )
}

// Prop Types - Like Component:
LikeBlog.propTypes = {
  blog: PropTypes.object.isRequired,
}

// Export Like Component:
export default LikeBlog
