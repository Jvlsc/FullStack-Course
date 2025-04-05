// Imports Modules:
import ReactDOM from 'react-dom/client'

// Imports App:
import App from './App'
import './App.css'

// Import React Query Tools:
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a QueryClient:
const queryClient = new QueryClient()

// Import Notification Context:
import { NotificationContextProvider } from './contexts/NotificationContext'
import { SessionContextProvider } from './contexts/SessionContext'

// Render Root:
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <SessionContextProvider>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </SessionContextProvider>
  </QueryClientProvider>
)
