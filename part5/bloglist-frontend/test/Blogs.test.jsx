// Import Modules:
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

// Import Components:
import Blogs from '../src/components/Blogs'

describe('<Blogs />', () => {
  test('renders title and author but not url or likes by default', () => {
    const blogs = [{
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'http://testurl.com',
      likes: 5,
      id: '123'
    }]

    const mockHandler = vi.fn()

    const { container } = render(
      <Blogs
        blogs={blogs}
        handleUpdate={mockHandler}
        handleDelete={mockHandler}
      />
    )

    const blogHeader = container.querySelector('.blog-header')
    expect(blogHeader).toHaveTextContent('Test Blog Title')
    expect(blogHeader).toHaveTextContent('Test Author')

    const blogDetails = container.querySelector('.blog-details')
    expect(blogDetails).toHaveStyle({ display: 'none' })
  })

  test('shows blog details when show button is clicked', async () => {
    const blogs = [{
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'http://testurl.com',
      likes: 5,
      id: '123'
    }]

    const mockHandler = vi.fn()

    const { container } = render(
      <Blogs
        blogs={blogs}
        handleUpdate={mockHandler}
        handleDelete={mockHandler}
      />
    )

    const user = userEvent.setup()
    const showButton = screen.getByText('Show')

    await user.click(showButton)

    const blogDetails = container.querySelector('.blog-details')
    expect(blogDetails).toBeVisible()
    expect(blogDetails).toHaveTextContent('http://testurl.com')
    expect(blogDetails).toHaveTextContent('5')
  })

  test('clicking like button twice calls event handler twice', async () => {
    const blogs = [{
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'http://testurl.com',
      likes: 5,
      id: '123'
    }]

    const mockUpdateHandler = vi.fn()
    const mockDeleteHandler = vi.fn()

    const { container } = render(
      <Blogs
        blogs={blogs}
        handleUpdate={mockUpdateHandler}
        handleDelete={mockDeleteHandler}
      />
    )

    const user = userEvent.setup()

    // First click show button to reveal the like button
    const showButton = screen.getByText('Show')
    await user.click(showButton)

    // Find and click the like button twice
    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    // Verify the update handler was called twice
    expect(mockUpdateHandler.mock.calls).toHaveLength(2)
  })
})