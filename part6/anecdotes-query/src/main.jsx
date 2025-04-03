// Import ReactDOM:
import ReactDOM from 'react-dom/client'

// Import React Query Tools:
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a QueryClient:
const queryClient = new QueryClient()

// Import Notification Context:
import { NotificationContextProvider } from './components/NotificationContext'

// Import App:
import App from './App'

// Render Root:
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </QueryClientProvider>
)