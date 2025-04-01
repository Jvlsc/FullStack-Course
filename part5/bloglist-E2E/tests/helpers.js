// Default User:
const defaultUser = {
  name: 'Root User',
  username: 'root',
  password: 'rootpassword'
}

// Clean Up Helper:
const cleanUp = async (page, request) => {
  await request.post('http://localhost:3003/api/testing/reset')
  await request.post('http://localhost:3003/api/users', { data: defaultUser })
  await page.goto('http://localhost:5173')
}

// Login Helper:
const loginWith = async (page, username, password) => {
  await page.getByTestId('username-input').fill(username)
  await page.getByTestId('password-input').fill(password)
  await page.getByTestId('login-button').click()
}

// Export Helpers:
export { defaultUser, cleanUp, loginWith }