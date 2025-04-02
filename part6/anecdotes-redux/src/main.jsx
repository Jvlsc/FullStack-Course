// Imports Modules:
import ReactDOM from 'react-dom/client'

// Imports Redux Tools:
import { Provider } from 'react-redux'

// Imports App:
import App from './App'

// Imports Store:
import store from './reducers/store'

// Render Root:
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)