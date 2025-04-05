// Mock React Query:
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query')
  return {
    ...actual,
    useMutation: () => ({
      mutate: vi.fn(),
      isLoading: false,
      isError: false,
      error: null
    })
  }
})

// Mock Blog Service:
vi.mock('../src/services/blogsService', () => ({
  default: {
    create: vi.fn(),
    fixPopulateMismatch: (blog) => blog
  }
}))

// Mock useField hook:
vi.mock('../src/hooks/useField', () => ({
  default: () => {
    let value = ''
    return {
      type: 'text',
      value,
      onChange: (e) => {
        value = e.target.value
      }
    }
  }
}))

// Import Modules:
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

// Import Components:
import BlogForm from '../src/components/BlogForm'

// Import Helpers:
import { blogs } from './testData'
import { TestWrapper } from './testUtils'

// Mock console methods to prevent them from showing
vi.spyOn(console, 'log').mockImplementation(() => {})
vi.spyOn(console, 'error').mockImplementation(() => {})
vi.spyOn(console, 'warn').mockImplementation(() => {})
vi.spyOn(console, 'info').mockImplementation(() => {})

// BlogForm Test:
describe('<BlogForm />', () => {
  test('Create a new blog recieves correct details...', () => {
    const blogFormRef = { current: { toggleVisibility: vi.fn() } }

    render(
      <TestWrapper>
        <BlogForm blogFormRef={blogFormRef} />
      </TestWrapper>
    )

    const titleInput = screen.getByTestId('title-input')
    const authorInput = screen.getByTestId('author-input')
    const urlInput = screen.getByTestId('url-input')
    const createButton = screen.getByTestId('create-blog-button')

    fireEvent.change(titleInput, { target: { value: blogs[0].title } })
    fireEvent.change(authorInput, { target: { value: blogs[0].author } })
    fireEvent.change(urlInput, { target: { value: blogs[0].url } })
    fireEvent.click(createButton)

    // The form should be cleared after submission
    expect(titleInput.value).toBe('')
    expect(authorInput.value).toBe('')
    expect(urlInput.value).toBe('')
  })
})