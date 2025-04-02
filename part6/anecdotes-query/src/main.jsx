// Import ReactDOM:
import ReactDOM from 'react-dom/client'

// Import React Query Tools:
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Import App:
import App from './App'

// Create a QueryClient:
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)