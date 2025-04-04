// Import Redux Toolkit:
import { createSlice } from '@reduxjs/toolkit'

// Import Services:
import blogService from '../services/blogs'
import loginService from '../services/login'

// Import Reducer Functions:
import { showNotification } from './notificationReducer'

// Create Slice - SessionSlice:
const sessionSlice = createSlice({
  name: 'session',
  initialState: [],
  reducers: {
    setSession(state, action) {
      return action.payload
    },
    clearSession() {
      return []
    },
  },
})

// Export Async Action Creator - Login:
export const login = (username, password) => {
  return async (dispatch) => {
    try {
      console.log('Logging in...')
      const user = await loginService.login({ username, password })

      console.log('User logged in:', user)
      window.localStorage.setItem('login', JSON.stringify(user))
      blogService.setToken(user.token)

      dispatch(setSession(user))
      dispatch(showNotification(`User '${username}' logged in successfully!`, 'success'))
    } catch (exception) {
      const errorMessage = exception.response.data.error
      console.error(errorMessage)
      dispatch(showNotification(`User '${username}' login failed! ${errorMessage}`, 'error'))
    }
  }
}

// Export Async Action Creator - Logout:
export const logout = () => {
  return async (dispatch) => {
    console.log('Logging out...')
    window.localStorage.removeItem('login')
    dispatch(clearSession())
    dispatch(showNotification('User logged out successfully!', 'success'))
  }
}

// Export Session Actions:
export const { setSession, clearSession } = sessionSlice.actions

// Export Session Reducer:
export default sessionSlice.reducer
