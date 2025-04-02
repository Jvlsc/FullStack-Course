// Imports Modules:
import React from 'react'
import ReactDOM from 'react-dom/client'

// Imports Redux:
import { createStore } from 'redux'
import reducer from './reducer'

// Create Store:
const store = createStore(reducer)

// App Component:
const App = () => {
  // Actions:
  const good = () => store.dispatch({ type: 'GOOD' })
  const ok = () => store.dispatch({ type: 'OK' })
  const bad = () => store.dispatch({ type: 'BAD' })
  const reset = () => store.dispatch({ type: 'ZERO' })

  // Render:
  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>ok</button> 
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

// Root Component:
const root = ReactDOM.createRoot(document.getElementById('root'))

// Render App Function:
const renderApp = () => root.render(<App />)

// Render App (Initial):
renderApp()

// Subscribe to Store:
store.subscribe(renderApp)