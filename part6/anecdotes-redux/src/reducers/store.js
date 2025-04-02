// Import Redux Toolkit:
import { configureStore } from '@reduxjs/toolkit'

// Import Reducers:
import anecdoteReducer from './anecdoteReducer'
import filterReducer from './filterReducer'
import notificationReducer from './notificationReducer'

// Configure Store:
const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

// Subscribe to Store:
store.subscribe(() => console.log('Store - State now: ', store.getState()))

// Export Store:
export default store