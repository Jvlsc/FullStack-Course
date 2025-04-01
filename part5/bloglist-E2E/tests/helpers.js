// Default User:
const defaultUser = {
  name: 'Root User',
  username: 'root',
  password: 'rootpassword'
}

// Clean Up Helper:
const cleanUp = async (page, request) => {
  await request.post('/api/testing/reset')
  await request.post('/api/users', { data: defaultUser })
  await page.goto('/')
}

// Login Helper:
const loginWith = async (page, username, password) => {
  await page.getByTestId('username-input').fill(username)
  await page.getByTestId('password-input').fill(password)
  await page.getByTestId('login-button').click()
}

// Export Helpers:
export { defaultUser, cleanUp, loginWith }