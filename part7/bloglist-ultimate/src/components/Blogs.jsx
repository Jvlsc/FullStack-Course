// Import React Router:
import { Link } from 'react-router-dom'

// Import Tanstack Hooks:
import { useQuery } from '@tanstack/react-query'

// Import Services:
import blogService from '../services/blogsService'

// Import Components:
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'

// Import Bootstrap Components:
import { Card } from 'react-bootstrap'

// Import PropTypes:
import PropTypes from 'prop-types'

// Blog Component:
const Blog = ({ blog }) => {
  const blogStyle = {
    marginBottom: '0.5rem',
  }

  return (
    <li style={blogStyle} className="blog-header">
      <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
    </li>
  )
}

// Blogs Component:
const Blogs = () => {
  // prettier-ignore
  const { data: blogs, isLoading, isError, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll(),
    onSuccess: (blogs) => {
      console.log('[BlogsComponent] Blogs fetched:', blogs)
    },
    onError: (error) => {
      console.error('[BlogsComponent] Error fetching blogs:', error)
    },
  })

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <ErrorMessage message={`Failed to load blogs: ${error.message}`} />
  }

  const sortedBlogs = blogs ? [...blogs].sort((a, b) => b.likes - a.likes) : []
  console.log('[BlogsComponent] Sorted blogs:', sortedBlogs)

  return (
    <Card className="blogs-card">
      <Card.Body className="blogs-body">
        <ul className="blogs-list">
          {sortedBlogs.map((blog) => (
            <li key={blog.id} className="blog-header" style={{ marginBottom: '0.5rem' }}>
              <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  )
}

// Prop Types - Blog Component:
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

// Export Blogs Component:
export default Blogs
