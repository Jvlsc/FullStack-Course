// Import Tanstack Hooks:
import { useMutation, useQueryClient } from '@tanstack/react-query'

// Import Context Hooks:
import { useNotificationDispatch } from '../contexts/NotificationContext'

// Import Services:
import blogService from '../services/blogsService'

// Import Custom Hooks:
import useField from '../hooks/useField'

// Import PropTypes:
import PropTypes from 'prop-types'

// Blog Form Component:
const BlogForm = ({ blogFormRef }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const createBlogMutation = useMutation({
    mutationFn: (newBlog) => blogService.create(newBlog),
    onSuccess: (createdBlog) => {
      console.log('[BlogForm] Blog created:', createdBlog)
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      const fixedBlog = blogService.fixPopulateMismatch(createdBlog)
      queryClient.setQueryData(['blogs'], (blogs) => [...blogs, fixedBlog])
      blogFormRef.current.toggleVisibility()
      notificationDispatch(`Blog '${fixedBlog.title}' created successfully!`, 'success')
    },
    onError: (exception) => {
      const errorMessage = exception.response.data.error
      console.error(errorMessage)
      notificationDispatch(`Blog '${title.value}' creation failed! ${errorMessage}`, 'error')
    },
  })

  const handleCreateBlog = (event) => {
    event.preventDefault()
    console.log('[BlogForm] Creating blog...')
    createBlogMutation.mutate({ title: title.value, author: author.value, url: url.value })
  }

  return (
    <div>
      <h3>Create New:</h3>
      <form onSubmit={handleCreateBlog}>
        <div>
          Title: &nbsp;
          <input id="title" data-testid="title-input" {...title} />
        </div>
        <div>
          Author: &nbsp;
          <input id="author" data-testid="author-input" {...author} />
        </div>
        <div>
          URL: &nbsp;
          <input id="url" data-testid="url-input" {...url} />
        </div>
        <button type="submit" data-testid="create-blog-button">
          Create
        </button>
      </form>
    </div>
  )
}

// Prop Types - Blog Form Component:
BlogForm.propTypes = {
  blogFormRef: PropTypes.object.isRequired,
}

// Export Blog Form Component:
export default BlogForm
