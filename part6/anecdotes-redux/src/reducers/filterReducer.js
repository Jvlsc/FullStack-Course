// Import Redux Toolkit:
import { createSlice } from '@reduxjs/toolkit'

// Create Slice:
const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      return action.payload
    }
  }
})

// Export Actions:
export const { setFilter } = filterSlice.actions

// Export Filter Reducer:
export default filterSlice.reducer