// Import Modules:
import { render, screen, fireEvent } from '@testing-library/react'

// Import Components:
import BlogForm from '../src/components/BlogForm'

// BlogForm Test:
describe('<BlogForm />', () => {
  test('Create a new blog recieves correct details...', () => {
    const handleCreate = vi.fn()

    render(<BlogForm handleCreate={handleCreate} />)

    const titleInput = screen.getByTestId('title-input')
    const authorInput = screen.getByTestId('author-input')
    const urlInput = screen.getByTestId('url-input')
    const createButton = screen.getByText('Create')

    fireEvent.change(titleInput, { target: { value: 'Test Blog Title' } })
    fireEvent.change(authorInput, { target: { value: 'Test Author' } })
    fireEvent.change(urlInput, { target: { value: 'http://testurl.com' } })
    fireEvent.click(createButton)

    expect(handleCreate.mock.calls).toHaveLength(1)
    expect(handleCreate.mock.calls[0][0]).toEqual({
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'http://testurl.com'
    })
  })
})