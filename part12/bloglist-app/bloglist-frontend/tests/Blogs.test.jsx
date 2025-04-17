// Import Modules:
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Import Components:
import Blogs from '../src/components/Blogs'

// Import Helpers:
import helpers from './helpers'


// Blogs Test:
describe('<Blogs />', () => {
  beforeEach(() => {
    window.localStorage.setItem('login', JSON.stringify({
      token: 'test-token',
      username: helpers.blogs[0].user.username,
      name: helpers.blogs[0].user.name
    }))
  })

  test('Renders title and author by default but not details (url or likes)...', () => {
    const mockHandler = vi.fn()

    const { container } = render(
      <Blogs
        blogs={helpers.blogs}
        handleUpdate={mockHandler}
        handleDelete={mockHandler}
      />
    )

    const blogHeader = container.querySelector('.blog-header')
    expect(blogHeader).toHaveTextContent(helpers.blogs[0].title)
    expect(blogHeader).toHaveTextContent(helpers.blogs[0].author)

    const blogDetails = container.querySelector('.blog-details')
    expect(blogDetails).toHaveStyle({ display: 'none' })
  })

  test('Shows blog details when "Show" button is clicked...', async () => {
    const mockHandler = vi.fn()

    const { container } = render(
      <Blogs
        blogs={helpers.blogs}
        handleUpdate={mockHandler}
        handleDelete={mockHandler}
      />
    )

    const user = userEvent.setup()
    const showButton = screen.getByText('Show')

    await user.click(showButton)

    const blogDetails = container.querySelector('.blog-details')
    expect(blogDetails).toBeVisible()
    expect(blogDetails).toHaveTextContent(helpers.blogs[0].url)
    expect(blogDetails).toHaveTextContent(helpers.blogs[0].likes)
  })

  test('Clicking like button twice calls event handler twice...', async () => {
    const mockUpdateHandler = vi.fn()
    const mockDeleteHandler = vi.fn()

    const { container } = render(
      <Blogs
        blogs={helpers.blogs}
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