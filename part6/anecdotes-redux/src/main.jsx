// Imports Modules:
import ReactDOM from 'react-dom/client'

// Imports Redux Tools:
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

// Imports App:
import App from './App'

// Imports Reducer:
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

// Create Store:
const store = createStore(combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer
}))

// Subscribe to Store:
store.subscribe(() => console.log('Store - State now: ', store.getState()))

// Render Root:
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)