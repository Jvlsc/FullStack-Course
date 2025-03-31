// Import Modules:
import { render } from '@testing-library/react'
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
})