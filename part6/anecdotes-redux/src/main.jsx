// Imports Modules:
import ReactDOM from 'react-dom/client'

// Imports Redux Tools:
import { createStore } from 'redux'
import { Provider } from 'react-redux'

// Imports App:
import App from './App'

// Imports Reducer:
import reducer from './reducers/anecdoteReducer'

// Create Store:
const store = createStore(reducer)

// Render Root:
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)