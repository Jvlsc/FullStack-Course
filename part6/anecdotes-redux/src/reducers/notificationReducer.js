// Import Redux Toolkit:
import { createSlice } from '@reduxjs/toolkit'

// Create Slice:
const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

// Export Actions:
export const { setNotification, clearNotification } = notificationSlice.actions

// Export Reducer:
export default notificationSlice.reducer
