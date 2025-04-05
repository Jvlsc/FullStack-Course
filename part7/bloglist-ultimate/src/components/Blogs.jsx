// Import React Router:
import { Link } from 'react-router-dom'

// Import Tanstack Hooks:
import { useQuery } from '@tanstack/react-query'

// Import Services:
import blogService from '../services/blogsService'

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
  const { data: blogs, isLoading, error } = useQuery({
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
    return <div>Loading blogs...</div>
  }

  if (error) {
    return <div>Error loading blogs: {error.message}</div>
  }

  const sortedBlogs = blogs ? [...blogs].sort((a, b) => b.likes - a.likes) : []
  console.log('[BlogsComponent] Sorted blogs:', sortedBlogs)

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

// Export Blogs Component:
export default Blogs
