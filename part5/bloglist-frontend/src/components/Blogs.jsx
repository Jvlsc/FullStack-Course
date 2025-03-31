// Blog Component:
const Blog = ({ blog }) => (
  <li>
    {blog.title} - {blog.author}
  </li>  
)

// Blogs Component:
const Blogs = ({ blogs }) => (
  <div>
    <h3>List of Blogs:</h3>
    <ul>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </ul>
  </div>
)

// Export Blogs Component:
export default Blogs