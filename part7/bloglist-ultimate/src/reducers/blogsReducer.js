// Import Redux Toolkit:
import { createSlice } from '@reduxjs/toolkit'

// Import Services:
import blogService from '../services/blogs'

// Import Reducer Functions:
import { showNotification } from './notificationReducer'

// Create Slice - BlogsSlice:
const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      return [...state, action.payload]
    },
    updateBlog(state, action) {
      return state.map((blog) => (blog.id === action.payload.id ? action.payload : blog))
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id)
    },
    clearBlogs() {
      return []
    },
  },
})

// Fix Populate Mismatch:
const fixPopulateMismatch = (blog) => {
  const user = JSON.parse(window.localStorage.getItem('login'))
  return {
    ...blog,
    user: { id: blog.user, name: user.name, username: user.username },
  }
}

// Export Async Action Creator - Get All Blogs:
export const getAllBlogs = () => {
  return async (dispatch) => {
    try {
      console.log('Fetching all blogs...')
      const blogs = await blogService.getAll()

      console.log('Blogs fetched:', blogs)
      dispatch(setBlogs(blogs))
    } catch (exception) {
      const errorMessage = exception.response.data.error
      console.error(errorMessage)
      dispatch(showNotification(`Error fetching blogs: ${errorMessage}`, 'error'))
    }
  }
}

// Export Async Action Creator - Create Blog:
export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      console.log('Creating blog...')
      const newBlog = await blogService.create(blogObject)

      console.log('Blog created:', newBlog)
      const fixedBlog = fixPopulateMismatch(newBlog)

      dispatch(appendBlog(fixedBlog))
      dispatch(showNotification(`Blog '${fixedBlog.title}' created successfully!`, 'success'))
    } catch (exception) {
      const errorMessage = exception.response.data.error
      console.error(errorMessage)
      dispatch(showNotification(`Blog '${blogObject.title}' creation failed! ${errorMessage}`, 'error'))
    }
  }
}

// Export Async Action Creator - Update Blog:
export const voteBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      console.log('Updating blog...')
      const updatedBlog = await blogService.update(blogObject.id, { likes: blogObject.likes + 1 })

      console.log('Updated blog:', updatedBlog)
      const fixedBlog = fixPopulateMismatch(updatedBlog)

      dispatch(updateBlog(fixedBlog))
      dispatch(showNotification(`Blog '${updatedBlog.title}' updated successfully!`, 'success'))
    } catch (exception) {
      const errorMessage = exception.response.data.error
      console.error(errorMessage)
      dispatch(showNotification(`Blog '${blogObject.title}' update failed! ${errorMessage}`, 'error'))
    }
  }
}

// Export Async Action Creator - Delete Blog:
export const deleteBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      if (!window.confirm(`Are you sure you want to delete "${blogObject.title}" blog?`)) return

      console.log('Deleting blog...')
      await blogService.remove(blogObject.id)

      dispatch(removeBlog(blogObject))
      dispatch(showNotification(`Blog '${blogObject.title}' deleted successfully!`, 'success'))
    } catch (exception) {
      const errorMessage = exception.response.data.error
      console.error(errorMessage)
      dispatch(showNotification(`Blog '${blogObject.title}' deletion failed! ${errorMessage}`, 'error'))
    }
  }
}

// Export Blogs Actions:
export const { setBlogs, appendBlog, updateBlog, removeBlog, clearBlogs } = blogsSlice.actions

// Export Blogs Reducer:
export default blogsSlice.reducer
