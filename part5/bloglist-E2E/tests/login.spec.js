// Import Playwright Utilities:
const { test, expect, beforeEach, describe } = require('@playwright/test')

// Default User:
const defaultUser = {
  name: 'Root User',
  username: 'root',
  password: 'rootpassword'
}

// Blog App - Login E2E Tests:
describe('Blog App - Login', () => {
  beforeEach(async ({ page, request }) => {
    // Reset the Database:
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', { data: defaultUser })

    // Go to the Login Page:
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown...', async ({ page }) => {
    await expect(page.getByText('Login:')).toBeVisible()
    await expect(page.getByText('Username')).toBeVisible()
    await expect(page.getByText('Password')).toBeVisible()
  })

  test('Succeeds with correct credentials...', async ({ page }) => {
    await page.getByTestId('username-input').fill(defaultUser.username)
    await page.getByTestId('password-input').fill(defaultUser.password)
    await page.getByTestId('login-button').click() 
  
    await expect(page.getByText('Root User logged in')).toBeVisible()
  })

  test('Fails with wrong credentials...', async ({ page }) => {
    await page.getByTestId('username-input').fill(defaultUser.username)
    await page.getByTestId('password-input').fill('fakepassword')
    await page.getByTestId('login-button').click() 

    await expect(page.getByText('invalid username or password')).toBeVisible()
    await expect(page.getByText('Login:')).toBeVisible()
  })
})