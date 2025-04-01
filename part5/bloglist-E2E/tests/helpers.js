// Default User:
const defaultUser = {
  name: 'Root User',
  username: 'root',
  password: 'rootpassword'
}

// Alternative User:
const testUser = {
  name: 'Test User',
  username: 'testuser',
  password: 'testpassword'
}

// Default Blog:
const defaultBlog = {
  title: 'Test Blog',
  author: 'Test Author',
  url: 'https://test.com'
}

// Clean Up Helper:
const cleanUp = async (page, request) => {
  await request.post('/api/testing/reset')
  await request.post('/api/users', { data: defaultUser })
  await request.post('/api/users', { data: testUser })
  await page.goto('/')
}

// Login Helper:
const loginWith = async (page, username, password) => {
  await page.getByTestId('username-input').fill(username)
  await page.getByTestId('password-input').fill(password)
  await page.getByTestId('login-button').click()
}

// Logout Helper:
const logout = async (page) => {
  await page.getByTestId('logout-button').click()
}

// Create Blog Helper:
const createBlog = async (page, title, author, url) => {
  await page.getByTestId('create-toggle-button').click()
  await page.getByTestId('title-input').fill(title)
  await page.getByTestId('author-input').fill(author)
  await page.getByTestId('url-input').fill(url)
  await page.getByTestId('create-blog-button').click()
}

// Export Helpers:
export { defaultUser, testUser, defaultBlog, cleanUp, loginWith, logout, createBlog }