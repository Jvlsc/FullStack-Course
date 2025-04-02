// Import Redux Toolkit:
import { createSlice } from '@reduxjs/toolkit'

// Import Services:
import anecdotesService from '../services/anecdotes'

// Reducer:
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdote = state.find(a => a.id === id)
      anecdote.votes += 1
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


// Export Initialize Anecdotes:
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

// Export Actions:
export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

// Export Anecdote Reducer:
export default anecdoteSlice.reducer