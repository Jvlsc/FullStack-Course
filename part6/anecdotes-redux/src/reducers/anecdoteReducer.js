// Import Redux Toolkit:
import { createSlice } from '@reduxjs/toolkit'

// Import Services:
import anecdotesService from '../services/anecdotes'

// Reducer:
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    incrementVote(state, action) {
      state.find(a => a.id === action.payload).votes += 1
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

// Export Async Action Creator - Vote Anecdote:
export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdotesService.update(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })
    dispatch(incrementVote(updatedAnecdote.id))
  }
}

// Export Actions:
export const { incrementVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

// Export Anecdote Reducer:
export default anecdoteSlice.reducer