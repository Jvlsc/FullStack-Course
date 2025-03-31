// Blog Component:
const Blog = ({ blog }) => (
  <li>
    {blog.title} {blog.author}
  </li>  
)

// Blogs Component:
const Blogs = ({ blogs, user }) => (
  <div>
    <h2>Blogs:</h2>
    <h4>{user} logged in:</h4>
    <ul>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </ul>
  </div>
)

// Export Blogs Component:
export default Blogs