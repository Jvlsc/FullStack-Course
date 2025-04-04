// Import Redux Toolkit:
import { createSlice } from '@reduxjs/toolkit'

// Create Slice - NotificationSlice:
const notificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return []
    },
  },
})

// Export Async Action Creator - Show Notification:
export const showNotification = (message, type) => {
  console.log('Showing notification')
  return async (dispatch) => {
    dispatch(setNotification({ message, type }))
  }
}

// Export Async Action Creator - Hide Notification:
export const hideNotification = () => {
  console.log('Hiding notification')
  return async (dispatch) => {
    dispatch(clearNotification())
  }
}

// Export Actions:
export const { setNotification, clearNotification } = notificationSlice.actions

// Export Reducer:
export default notificationSlice.reducer
