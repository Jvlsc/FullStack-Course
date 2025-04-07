// Import React Query:
import { useQuery } from '@tanstack/react-query'

// Import React Router:
import { useParams } from 'react-router-dom'

// Import Blog Service:
import blogService from '../services/blogsService'

// Import Components:
import BlogDetails from './BlogDetails'
import BlogComments from './BlogComments'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'

// Import Bootstrap Components:
import { Row, Col } from 'react-bootstrap'

// Blog View Component:
const BlogView = () => {
  const { id } = useParams()

  const { data: blog, isLoading, isError, error } = useQuery({
    queryKey: ['blogs', id],
    queryFn: () => blogService.getById(id),
  })

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <ErrorMessage message={`Failed to load blog: ${error.message}`} />
  }

  return (
    <div>
      <h2>Blog Details:</h2>
      <br />
      <Row>
        <Col md={5}>
          <BlogDetails blog={blog} />
        </Col>
        <Col md={7}>
          <BlogComments blog={blog} />
        </Col>
      </Row>
    </div>
  )
}

// Export Blog View Component:
export default BlogView

