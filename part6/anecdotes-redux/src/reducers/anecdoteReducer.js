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
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


// Export Async Action Creator - Initialize Anecdotes:
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

// Export Async Action Creator - Create Anecdote:
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

// Export Actions:
export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

// Export Anecdote Reducer:
export default anecdoteSlice.reducer