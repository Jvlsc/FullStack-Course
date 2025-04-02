// Filter Reducer:
const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload
    default:
      return state
  }
}

// Action Creator: Set Filter:
export const setFilter = filter => {
  return {
    type: 'SET_FILTER',
    payload: filter,
  }
}

// Export Filter Reducer:
export default filterReducer