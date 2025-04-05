// Imports Modules:
import ReactDOM from 'react-dom/client'

// Imports Redux Tools:
import { Provider } from 'react-redux'

// Imports App:
import App from './App'
import './App.css'

// Imports Store:
import store from './reducers/store'

// Import React Query Tools:
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a QueryClient:
const queryClient = new QueryClient()

// Import Notification Context:
import { NotificationContextProvider } from './contexts/NotificationContext'

// Render Root:
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </NotificationContextProvider>
  </QueryClientProvider>
)
