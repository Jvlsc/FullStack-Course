// Import Modules:
import { render, screen, fireEvent } from '@testing-library/react'

// Import Components:
import BlogForm from '../src/components/BlogForm'

// Import Helpers:
import helpers from './helpers'

// BlogForm Test:
describe('<BlogForm />', () => {
  test('Create a new blog recieves correct details...', () => {
    const handleCreate = vi.fn()

    render(<BlogForm handleCreate={handleCreate} />)

    const titleInput = screen.getByTestId('title-input')
    const authorInput = screen.getByTestId('author-input')
    const urlInput = screen.getByTestId('url-input')
    const createButton = screen.getByText('Create')

    fireEvent.change(titleInput, { target: { value: helpers.blogs[0].title } })
    fireEvent.change(authorInput, { target: { value: helpers.blogs[0].author } })
    fireEvent.change(urlInput, { target: { value: helpers.blogs[0].url } })
    fireEvent.click(createButton)

    expect(handleCreate.mock.calls).toHaveLength(1)
    expect(handleCreate.mock.calls[0][0]).toEqual({
      title: helpers.blogs[0].title,
      author: helpers.blogs[0].author,
      url: helpers.blogs[0].url
    })
  })
})