// Import React Router:
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

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

  const handleBlogClick = (blogId) => {
    navigate(`/blogs/${blogId}`)
  }

  return (
    <Card className="blogs-list-card">
      <Card.Body className="blogs-list-body">
        <ul className="blogs-list">
          {sortedBlogs.map((blog) => (
            <li
              key={blog.id}
              className="blog-list-item d-flex justify-content-between align-items-center"
              onClick={() => handleBlogClick(blog.id)}
            >
              <div className="blog-list-item-title">
                {blog.title} by {blog.author}
              </div>
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
