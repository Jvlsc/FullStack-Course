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

// Import FontAwesome:
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

// BlogsList Component:
const BlogsList = () => {
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
    <Card className="blogs-list-card">
      <Card.Body className="blogs-list-body">
        <ul className="blogs-list">
          {sortedBlogs.map((blog) => (
            <li key={blog.id} className="blog-header d-flex justify-content-between align-items-center">
              <Link to={`/blogs/${blog.id}`} className="text-decoration-none">
                {blog.title} by {blog.author}
              </Link>
              <span className="text-danger">
                <FontAwesomeIcon icon={faHeart} /> {blog.likes || 0}
              </span>
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  )
}

// Export BlogsList Component:
export default BlogsList
