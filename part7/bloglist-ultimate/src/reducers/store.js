// Import Redux Toolkit:
import { configureStore } from '@reduxjs/toolkit'

// Import Reducers:
import notificationReducer from './notificationReducer'

// Configure Store:
const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
})

// Subscribe to Store:
store.subscribe(() => console.log('Store - State now: ', store.getState()))

// Export Store:
export default store
