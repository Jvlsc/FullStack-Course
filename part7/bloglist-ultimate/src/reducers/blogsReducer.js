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
    clearBlogs() {
      return []
    },
  },
})

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

      // Fix populate mismatch:
      const user = JSON.parse(window.localStorage.getItem('login'))
      newBlog.user = {
        id: newBlog.user,
        name: user.name,
        username: user.username,
      }

      dispatch(appendBlog(newBlog))
      dispatch(showNotification(`Blog '${newBlog.title}' created successfully!`, 'success'))
    } catch (exception) {
      const errorMessage = exception.response.data.error
      console.error(errorMessage)
      dispatch(showNotification(`Blog '${blogObject.title}' creation failed! ${errorMessage}`, 'error'))
    }
  }
}

// Export Blogs Actions:
export const { setBlogs, appendBlog, clearBlogs } = blogsSlice.actions

// Export Blogs Reducer:
export default blogsSlice.reducer
