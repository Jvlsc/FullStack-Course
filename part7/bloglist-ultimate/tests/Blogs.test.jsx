// Import React Testing Library:
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Import Redux:
import { Provider } from 'react-redux'

// Import Component to Test:
import Blogs from '../src/components/Blogs'

// Import Test Data and Utils:
import { renderWithProviders, blogs as testBlogs } from './testUtils'

// Mock console.log
console.log = () => {}

// Blogs Test:
describe('<Blogs />', () => {
  beforeEach(() => {
    window.localStorage.setItem(
      'login',
      JSON.stringify({
        token: 'test-token',
        username: testBlogs[0].user.username,
        name: testBlogs[0].user.name,
      })
    )
  })

  test('Renders title and author by default but not details (url or likes)...', () => {
    const { container } = renderWithProviders(<Blogs />, {
      preloadedState: {
        blogs: testBlogs,
      },
    })

    const blogHeader = container.querySelector('.blog-header')
    expect(blogHeader).toHaveTextContent(testBlogs[0].title)
    expect(blogHeader).toHaveTextContent(testBlogs[0].author)

    const blogDetails = container.querySelector('.blog-details')
    expect(blogDetails).toHaveStyle({ display: 'none' })
  })

  test('Shows blog details when "Show" button is clicked...', async () => {
    const { container } = renderWithProviders(<Blogs />, {
      preloadedState: {
        blogs: testBlogs,
      },
    })

    const user = userEvent.setup()
    const showButton = screen.getByText('Show')

    await user.click(showButton)

    const blogDetails = container.querySelector('.blog-details')
    expect(blogDetails).toBeVisible()
    expect(blogDetails).toHaveTextContent(testBlogs[0].url)
    expect(blogDetails).toHaveTextContent(testBlogs[0].likes)
  })

  test('Clicking like button twice calls event handler twice...', async () => {
    // Create a mock store with a spy on dispatch
    const mockDispatch = vi.fn()
    const mockStore = {
      getState: () => ({ blogs: testBlogs }),
      dispatch: mockDispatch,
      subscribe: vi.fn(),
    }

    const { container } = renderWithProviders(<Blogs />, {
      preloadedState: {
        blogs: testBlogs,
      },
      store: mockStore,
    })

    const user = userEvent.setup()

    const showButton = screen.getByText('Show')
    await user.click(showButton)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    // Check if dispatch was called twice
    expect(mockDispatch.mock.calls).toHaveLength(2)
  })
})
