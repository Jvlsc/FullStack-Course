// Initial State:
const initialState = { good: 0, ok: 0, bad: 0 }

// Reducer - Counter:
const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return { ...state, good: state.good + 1 }
    case 'OK':
      return { ...state, ok: state.ok + 1 }
    case 'BAD':
      return { ...state, bad: state.bad + 1 }
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

// Export Reducer:
export default counterReducer
