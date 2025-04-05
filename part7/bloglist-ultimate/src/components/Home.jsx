// Import React Hooks:
import { useRef } from 'react'

// Import Components:
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blogs from './Blogs'

// Home Component:
const Home = () => {
  const blogFormRef = useRef()

  return (
    <>
      <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <br />
      <Blogs />
    </>
  )
}

// Export Home Component:
export default Home