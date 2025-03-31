// Blog Component:
const Blog = ({ blog }) => (
  <li>
    {blog.title} {blog.author}
  </li>  
)

// Blogs Component:
const Blogs = ({ blogs, user, handleLogout }) => (
  <div>
    <h2>Blogs:</h2>
    <div>
      <p>
        {user} logged in &nbsp;
        <button onClick={handleLogout}>Logout</button>
      </p>
    </div>
    <ul>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </ul>
  </div>
)

// Export Blogs Component:
export default Blogs