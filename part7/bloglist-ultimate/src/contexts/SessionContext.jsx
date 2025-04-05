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
    console.log('[SessionContext] Session set:', user.username)
  }

  const getSession = () => {
    console.log('[SessionContext] Getting session...')
    const userJSON = window.localStorage.getItem('login')
    if (userJSON) {
      const parsedUser = JSON.parse(userJSON)
      console.log('[SessionContext] Session found:', parsedUser.username)
      return parsedUser
    }
    console.log('[SessionContext] No session found')
    return null
  }

  const clearSession = () => {
    console.log('[SessionContext] Clearing session...')
    window.localStorage.removeItem('login')
    userDispatch({ type: 'CLEAR_SESSION', payload: null })
    console.log('[SessionContext] Session cleared')
  }

  return (
    <SessionContext.Provider value={[user, setSession, getSession, clearSession]}>
      {props.children}
    </SessionContext.Provider>
  )
}

// Session Context Provider Prop Types:
SessionContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

// Export Session Context:
export const useSessionContext = () => {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSessionContext must be used within a SessionContextProvider')
  }
  return context
}

// Export Session User Hook:
export const useSessionUser = () => {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSessionUser must be used within a SessionContextProvider')
  }
  return context[0]
}

// Export Set Session Hook:
export const useSessionSetDispatch = () => {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSessionSetDispatch must be used within a SessionContextProvider')
  }
  return context[1]
}

// Export Get Session Hook:
export const useSessionGetDispatch = () => {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSessionGetDispatch must be used within a SessionContextProvider')
  }
  return context[2]
}

// Export Clear Session Hook:
export const useSessionClearDispatch = () => {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSessionClearDispatch must be used within a SessionContextProvider')
  }
  return context[3]
}

// Export Session Context:
export default SessionContext
