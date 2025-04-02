// Import Redux Toolkit:
import { createSlice } from '@reduxjs/toolkit'

// Get ID:
const getId = () => (100000 * Math.random()).toFixed(0)

// As Object:
const asObject = (anecdote) => ({ content: anecdote, id: getId(), votes: 0 })

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
      state.push(asObject(action.payload))
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

// Export Actions:
export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

// Export Anecdote Reducer:
export default anecdoteSlice.reducer