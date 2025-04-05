import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'

// Test Data:
export const blogs = [
  {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    id: '123',
    user: {
      id: '123',
      name: 'Test User',
      username: 'testuser',
    },
  },
]

// Create a mock store that will be used in tests
export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Create a mock store with any reducers needed
    store = configureStore({
      reducer: {
        blogs: (state = preloadedState.blogs || [], action) => state,
        notification: (state = preloadedState.notification || {}, action) => state,
        session: (state = preloadedState.session || {}, action) => state,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  // Create wrapper with mock store
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  // Add PropTypes to fix linter error
  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  }

  // Return render result plus the store for assertions/updates
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

// Export test data
export default { blogs }
