// Import Modules:
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { useState } from 'react'

// Import Components:
import Blogs from '../src/components/Blogs'

// Import Helpers:
import { TestWrapper } from './testUtils'
import { blogs } from './testData'

// Shared state for React Query mock
let blogsData = [...blogs]
let forceUpdate = () => {}

// Mock React Query:
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query')

  return {
    ...actual,
    useQueryClient: () => ({
      setQueryData: (key, updater) => {
        if (typeof updater === 'function') {
          blogsData = updater(blogsData)
        } else {
          blogsData = updater
        }
        console.log('Updated blogs data:', blogsData)
        if (forceUpdate) forceUpdate()
        return blogsData
      },
      invalidateQueries: () => {
        if (forceUpdate) forceUpdate()
        return Promise.resolve()
      }
    }),
    useQuery: () => {
      const [, setUpdate] = useState(0)
      forceUpdate = () => setUpdate(prev => prev + 1)
      return {
        data: blogsData,
        isLoading: false,
        error: null
      }
    },
    useMutation: ({ mutationFn, onSuccess }) => ({
      mutate: async (blog) => {
        try {
          console.log('Before mutation:', blog)
          const updatedBlog = await mutationFn(blog)
          console.log('After mutation:', updatedBlog)
          if (onSuccess) {
            onSuccess(updatedBlog)
          }
        } catch (error) {
          console.error('Mutation error:', error)
        }
      },
      isLoading: false,
      isError: false,
      error: null
    })
  }
})

// Mock Blog Service:
vi.mock('../src/services/blogsService', () => {
  return {
    default: {
      update: vi.fn((id, { likes }) => {
        const blogIndex = blogsData.findIndex(b => b.id === id)
        if (blogIndex !== -1) {
          blogsData[blogIndex] = { ...blogsData[blogIndex], likes }
          console.log('Updated blog in service:', blogsData[blogIndex])
          return Promise.resolve(blogsData[blogIndex])
        }
        return Promise.reject(new Error('Blog not found'))
      }),
      fixPopulateMismatch: (blog) => blog,
      getAll: vi.fn(() => Promise.resolve(blogsData))
    }
  }
})

// Mock console methods to prevent them from showing
vi.spyOn(console, 'log').mockImplementation(() => {})
vi.spyOn(console, 'error').mockImplementation(() => {})
vi.spyOn(console, 'warn').mockImplementation(() => {})
vi.spyOn(console, 'info').mockImplementation(() => {})

describe('Blog component', () => {
  beforeEach(() => {
    // Reset blogs data before each test
    blogsData = [...blogs]
    forceUpdate = () => {}
    vi.clearAllMocks()
    // Set up localStorage for tests
    window.localStorage.setItem('login', JSON.stringify({
      token: 'test-token',
      username: blogs[0].user.username,
      name: blogs[0].user.name
    }))
  })

  test('renders blog title and author without showing details', () => {
    render(
      <TestWrapper>
        <Blogs />
      </TestWrapper>
    )

    const element = screen.getByText('Test Blog Title - Test Author')
    expect(element).toBeDefined()
  })

  test('shows blog details when show button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <TestWrapper>
        <Blogs />
      </TestWrapper>
    )

    const showButton = screen.getByTestId('blog-show-button')
    await user.click(showButton)

    const element = screen.getByText('Test Blog Title')
    expect(element).toBeDefined()
  })

  test('Clicking like button twice updates likes correctly', async () => {
    const user = userEvent.setup()
    render(
      <TestWrapper>
        <Blogs />
      </TestWrapper>
    )

    // Show blog details
    const showButton = screen.getByTestId('blog-show-button')
    await user.click(showButton)

    const likeButton = screen.getByTestId('blog-like-button')
    const likesText = screen.getByTestId('blog-likes-text')

    // Initial likes should be 5
    expect(likesText).toHaveTextContent('5')

    // First like
    await user.click(likeButton)
    await waitFor(() => {
      expect(likesText).toHaveTextContent('6')
    }, { timeout: 2000 })

    // Second like
    await user.click(likeButton)
    await waitFor(() => {
      expect(likesText).toHaveTextContent('7')
    }, { timeout: 2000 })
  })
})