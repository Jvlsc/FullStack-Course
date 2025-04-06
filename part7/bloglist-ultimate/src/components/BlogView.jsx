// Import React Query:
import { useQuery } from '@tanstack/react-query'

// Import React Router:
import { useParams } from 'react-router-dom'

// Import Blog Service:
import blogService from '../services/blogsService'

// Import Components:
import LikeBlog from './LikeBlog'
import DeleteBlog from './DeleteBlog'
import Comments from './Comments'
// Blog View Component:
const BlogView = () => {
  const { id } = useParams()

  const { data: blog, isLoading, isError, error } = useQuery({
    queryKey: ['blogs', id],
    queryFn: () => blogService.getById(id),
  })

  const commentStyle = {
    marginBottom: '0.5rem',
  }

  if (isLoading) {
    return <div>Loading blog...</div>
  }

  if (isError) {
    return <div>Error loading blog: {error.message}</div>
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <p>URL: <a href={blog.url}>{blog.url}</a></p>
      <LikeBlog blog={blog} />
      <p>Added by {blog.user.name}</p>
      {blog.user.username === JSON.parse(window.localStorage.getItem('login')).username ? (
        <DeleteBlog blog={blog} />
      ) : null}
      <br />
      <Comments blog={blog} />
    </div>
  )
}

// Export Blog View Component:
export default BlogView

