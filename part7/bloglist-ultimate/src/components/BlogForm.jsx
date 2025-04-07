// Import Tanstack Hooks:
import { useMutation, useQueryClient } from '@tanstack/react-query'

// Import Context Hooks:
import { useNotificationDispatch } from '../contexts/NotificationContext'
import { useSessionClearDispatch } from '../contexts/SessionContext'

// Import Services:
import blogService from '../services/blogsService'

// Import Custom Hooks:
import useField from '../hooks/useField'

// Import PropTypes:
import PropTypes from 'prop-types'

// Import Bootstrap components:
import { Card, Form, Button } from 'react-bootstrap'

// Blog Form Component:
const BlogForm = () => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const notificationDispatch = useNotificationDispatch()
  const clearSessionDispatch = useSessionClearDispatch()

  const queryClient = useQueryClient()

  const resetForm = () => {
    title.onReset()
    author.onReset()
    url.onReset()
  }

  const createBlogMutation = useMutation({
    mutationFn: (newBlog) => blogService.create(newBlog),
    onSuccess: (createdBlog) => {
      console.log('[BlogFormComponent] Blog created:', createdBlog)
      queryClient.setQueryData(['blogs'], (blogs) => [...blogs, createdBlog])
      notificationDispatch(`Blog '${createdBlog.title}' created successfully!`, 'success')
      resetForm()
    },
    onError: (exception) => {
      const errorMessage = exception.response.data.error
      console.error(errorMessage)
      notificationDispatch(`Blog '${title.value}' creation failed! ${errorMessage}`, 'error')
      if(exception.response.status === 401 && errorMessage === 'Token Expired') {
        clearSessionDispatch()
      }
    },
  })

  const handleCreateBlog = (event) => {
    event.preventDefault()
    console.log('[BlogFormComponent] Creating blog...')
    createBlogMutation.mutate({ title: title.value, author: author.value, url: url.value })
  }

  return (
    <Card className="blog-form-card">
      <Card.Body className="blog-form-body">
        <h4 className="blog-form-title">Create New Blog:</h4>
        <Form onSubmit={handleCreateBlog} className="d-flex flex-column align-items-center">
          <Form.Group className="blog-form-group">
            <Form.Label className="blog-form-label">Title:</Form.Label>
            <Form.Control
              id="title"
              data-testid="title-input"
              {...title}
            />
          </Form.Group>
          <Form.Group className="blog-form-group">
            <Form.Label className="blog-form-label">Author:</Form.Label>
            <Form.Control
              id="author"
              data-testid="author-input"
              {...author}
            />
          </Form.Group>
          <Form.Group className="blog-form-group">
            <Form.Label className="blog-form-label">URL:</Form.Label>
            <Form.Control
              id="url"
              data-testid="url-input"
              {...url}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            data-testid="create-blog-button"
            className="blog-form-button"
          >
            Create
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

// Export Blog Form Component:
export default BlogForm
