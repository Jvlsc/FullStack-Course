import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from '../src/contexts/NotificationContext'
import PropTypes from 'prop-types'

// Create a new QueryClient instance for testing
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

// Wrapper component that provides all necessary context providers
export const TestWrapper = ({ children }) => {
  const testQueryClient = createTestQueryClient()

  return (
    <QueryClientProvider client={testQueryClient}>
      <NotificationContextProvider>
        {children}
      </NotificationContextProvider>
    </QueryClientProvider>
  )
}

TestWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

