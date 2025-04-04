// Import Modules:
import { screen, fireEvent } from '@testing-library/react'

// Import Components:
import BlogForm from '../src/components/BlogForm'

// Import Helpers:
import { renderWithProviders, blogs as testBlogs } from './testUtils'

// BlogForm Test:
describe('<BlogForm />', () => {
  test('Create a new blog receives correct details...', () => {
    // Create a mock ref
    const mockRef = { current: { toggleVisibility: vi.fn() } }

    // Create a mock store with a spy on dispatch
    const mockDispatch = vi.fn()
    const mockStore = {
      getState: () => ({}),
      dispatch: mockDispatch,
      subscribe: vi.fn(),
    }

    renderWithProviders(<BlogForm blogFormRef={mockRef} />, {
      store: mockStore,
    })

    const titleInput = screen.getByTestId('title-input')
    const authorInput = screen.getByTestId('author-input')
    const urlInput = screen.getByTestId('url-input')
    const createButton = screen.getByText('Create')

    fireEvent.change(titleInput, { target: { value: testBlogs[0].title } })
    fireEvent.change(authorInput, { target: { value: testBlogs[0].author } })
    fireEvent.change(urlInput, { target: { value: testBlogs[0].url } })
    fireEvent.click(createButton)

    // Check if dispatch was called with the right action
    expect(mockDispatch).toHaveBeenCalled()

    // The first argument of the first call should be a function (thunk)
    expect(typeof mockDispatch.mock.calls[0][0]).toBe('function')
  })
})
