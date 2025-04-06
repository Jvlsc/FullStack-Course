// Imports Modules:
import ReactDOM from 'react-dom/client'

// Import React Router:
import { BrowserRouter as Router } from 'react-router-dom'

// Import React Query Tools:
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Import Notification Context:
import { NotificationContextProvider } from './contexts/NotificationContext'
import { SessionContextProvider } from './contexts/SessionContext'

// Imports App Component:
import App from './App'
import './App.css'

// Create a QueryClient:
const queryClient = new QueryClient()

// Render App Component:
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <SessionContextProvider>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </SessionContextProvider>
    </Router>
  </QueryClientProvider>
)
