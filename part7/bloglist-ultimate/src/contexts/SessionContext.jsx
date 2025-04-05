// Import React:
import { createContext, useContext, useReducer } from 'react'

// Import PropTypes:
import PropTypes from 'prop-types'

// Session Reducer:
const sessionReducer = (state, action) => {
  switch (action.type) {
  case 'SET_SESSION':
    return action.payload
  case 'CLEAR_SESSION':
    return null
  }
}
// Create a Session Context:
const SessionContext = createContext()

// Create a Session Context Provider:
export const SessionContextProvider = (props) => {
  const [user, userDispatch] = useReducer(sessionReducer, null)

  const setSession = (user) => {
    console.log('[SessionContext] Setting session...')
    window.localStorage.setItem('login', JSON.stringify(user))
    userDispatch({ type: 'SET_SESSION', payload: user })
  }

  const getSession = () => {
    console.log('[SessionContext] Getting session...')
    const userJSON = window.localStorage.getItem('login')
    if (userJSON) return JSON.parse(userJSON)
    return null
  }

  const clearSession = () => {
    console.log('[SessionContext] Clearing session...')
    window.localStorage.removeItem('login')
    userDispatch({ type: 'CLEAR_SESSION', payload: null })
  }

  return (
    <SessionContext.Provider value={[user, setSession, getSession, clearSession]}>
      {props.children}
    </SessionContext.Provider>
  )
}

// Session Context Hook:
export const useSessionUser = () => {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSessionUser must be used within a SessionContextProvider')
  }
  return context[0]
}

// Session Context Set Session Hook:
export const useSessionSet = () => {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSessionSet must be used within a SessionContextProvider')
  }
  return context[1]
}

// Session Context Get Session Hook:
export const useSessionGet = () => {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSessionGet must be used within a SessionContextProvider')
  }
  return context[2]
}

// Session Context Clear Session Hook:
export const useSessionClear = () => {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSessionClear must be used within a SessionContextProvider')
  }
  return context[3]
}

// Session Context Provider Prop Types:
SessionContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

// Export Session Context:
export default SessionContext
