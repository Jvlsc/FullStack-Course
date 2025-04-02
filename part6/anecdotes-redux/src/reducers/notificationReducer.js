// Import Redux Toolkit:
import { createSlice } from '@reduxjs/toolkit'

// Create Slice:
const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Initial Notification',
  reducers: {
    setNotification(state, action) {
      return action.payload
    }
  }
})

// Export Actions:
export const { setNotification } = notificationSlice.actions

// Export Reducer:
export default notificationSlice.reducer
