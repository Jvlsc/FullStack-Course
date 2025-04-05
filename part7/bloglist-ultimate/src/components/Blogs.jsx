// Import React Hooks:
import { useState } from 'react'

// Import Tanstack Hooks:
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Import Notification Context:
import { useNotificationDispatch } from '../contexts/NotificationContext'

// Import Services:
import blogService from '../services/blogsService'

// Import PropTypes:
import PropTypes from 'prop-types'

// Blog Details Body Component:
const BlogDetailsBody = ({ blog, toggleVisibility }) => {
  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const updateBlogMutation = useMutation({
    mutationFn: (updatedBlog) => blogService.update(updatedBlog.id, { likes: updatedBlog.likes + 1 }),
    onSuccess: (updatedBlog) => {
      console.log('[BlogDetailsBody] Blog updated:', updatedBlog)
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      const fixedBlog = blogService.fixPopulateMismatch(updatedBlog)
      queryClient.setQueryData(['blogs'], (blogs) =>
        blogs.map((blog) => (blog.id === updatedBlog.id ? fixedBlog : blog))
      )
      dispatch(`Blog '${fixedBlog.title}' updated successfully!`, 'success')
    },
    onError: (error) => {
      console.error('[BlogDetailsBody] Error updating blog:', error)
      dispatch(`Error updating blog: ${error.message}`, 'error')
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: (blog) => blogService.remove(blog.id),
    onSuccess: (_, deletedBlog) => {
      console.log('[BlogDetailsBody] Blog deleted:', deletedBlog)
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      queryClient.setQueryData(['blogs'], (blogs) =>
        blogs.filter((blog) => blog.id !== deletedBlog.id)
      )
      dispatch(`Blog '${deletedBlog.title}' deleted successfully!`, 'success')
    },
    onError: (error) => {
      console.error('[BlogDetailsBody] Error deleting blog:', error)
      dispatch(`Error deleting blog: ${error.message}`, 'error')
    }
  })

  const handleVote = (blog) => updateBlogMutation.mutate(blog)
  const handleDelete = (blog) => {
    if (!window.confirm(`Are you sure you want to delete "${blog.title}" blog?`)) return
    deleteBlogMutation.mutate(blog)
  }

  const deleteButtonStyle = {
    backgroundColor: 'red',
    color: 'white',
  }

  return (
    <>
      {blog.title} &nbsp;
      <button onClick={toggleVisibility}>Hide</button>
      <ul>
        <li>{blog.url}</li>
        <li>
          <span data-testid="blog-likes-text">{blog.likes}</span> &nbsp;
          <button data-testid="blog-like-button" onClick={() => handleVote(blog)}>
            Like
          </button>
        </li>
        <li>{blog.author}</li>
        {blog.user.username === JSON.parse(window.localStorage.getItem('login')).username ? (
          <>
            <li>
              <button style={deleteButtonStyle} data-testid="blog-delete-button" onClick={() => handleDelete(blog)}>
                Delete
              </button>
            </li>
          </>
        ) : null}
        <br />
      </ul>
    </>
  )
}

// Blog Details Header Component:
const BlogDetailsHeader = ({ blog, toggleVisibility }) => {
  return (
    <>
      {blog.title} - {blog.author} &nbsp;
      <button data-testid="blog-show-button" onClick={toggleVisibility}>
        Show
      </button>
    </>
  )
}

// Blog Component:
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = {
    display: visible ? '' : 'none',
    marginTop: '1rem',
    marginBottom: '1rem',
  }

  return (
    <>
      <li style={hideWhenVisible} className="blog-header">
        <BlogDetailsHeader blog={blog} toggleVisibility={toggleVisibility} />
      </li>
      <li style={showWhenVisible} className="blog-details">
        <BlogDetailsBody blog={blog} toggleVisibility={toggleVisibility} />
      </li>
    </>
  )
}

// Blogs Component:
const Blogs = () => {
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll(),
    onSuccess: (blogs) => {
      console.log('[Blogs Component] Blogs fetched:', blogs)
    },
    onError: (error) => {
      console.error('[Blogs Component] Error fetching blogs:', error)
    }
  })

  if (isLoading) {
    return <div>Loading blogs...</div>
  }

  if (error) {
    return <div>Error loading blogs: {error.message}</div>
  }

  // Solo ordenamos los blogs si tenemos datos
  const sortedBlogs = blogs ? [...blogs].sort((a, b) => b.likes - a.likes) : []
  console.log('[Blogs Component] Sorted blogs:', sortedBlogs)


  return (
    <div>
      <h3>List of Blogs:</h3>
      <ul>
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </div>
  )
}

// Prop Types - Blog Component:
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

// Prop Types - Blog Details Header Component:
BlogDetailsHeader.propTypes = {
  blog: PropTypes.object.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
}

// Prop Types - Blog Details Body Component:
BlogDetailsBody.propTypes = {
  blog: PropTypes.object.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
}

// Export Blogs Component:
export default Blogs
