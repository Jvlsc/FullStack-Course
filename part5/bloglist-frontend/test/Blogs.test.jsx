// Import Modules:
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Import Components:
import Blogs from '../src/components/Blogs'

// Blogs Test:
describe('<Blogs />', () => {
  test('Renders title and author by default but not details (url or likes)...', () => {
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

  test('Shows blog details when "Show" button is clicked...', async () => {
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

  test('Clicking like button twice calls event handler twice...', async () => {
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

    const showButton = screen.getByText('Show')
    await user.click(showButton)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockUpdateHandler.mock.calls).toHaveLength(2)
  })
})