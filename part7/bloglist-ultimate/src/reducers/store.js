// Import Redux Toolkit:
import { configureStore } from '@reduxjs/toolkit'

// Import Reducers:
import blogsReducer from './blogsReducer'
import notificationReducer from './notificationReducer'
import sessionReducer from './sessionReducer'

// Configure Store:
const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notification: notificationReducer,
    session: sessionReducer,
  },
})

// Subscribe to Store:
store.subscribe(() => console.log('[Store] State now: ', store.getState()))

// Export Store:
export default store
