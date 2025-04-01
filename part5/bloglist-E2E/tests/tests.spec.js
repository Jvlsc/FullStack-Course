// Import Playwright Utilities:
const { test, expect, beforeEach, describe } = require('@playwright/test')

// Import Helpers:
const helpers = require('./helpers')

// Blog App - Login E2E Tests:
describe('Blog App', async () => {
  beforeEach(async ({ page, request }) => {
    await helpers.cleanUp(page, request)
  })

  test('Login form is shown...', async ({ page }) => {
    await expect(page.getByText('Login:')).toBeVisible()
    await expect(page.getByText('Username')).toBeVisible()
    await expect(page.getByText('Password')).toBeVisible()
  })

  describe('Login', async () => {
    test('Succeeds with correct credentials...', async ({ page }) => {
      await helpers.loginWith(page, helpers.defaultUser.username, helpers.defaultUser.password)
      await expect(page.getByText('Root User logged in')).toBeVisible()
    })

    test('Fails with wrong credentials...', async ({ page }) => {
      await helpers.loginWith(page, helpers.defaultUser.username, 'fakepassword')
      await expect(page.getByText('invalid username or password')).toBeVisible()
      await expect(page.getByText('Login:')).toBeVisible()
    })
  })

  describe('When logged in', async () => {
    beforeEach(async ({ page }) => {
      await helpers.loginWith(page, helpers.defaultUser.username, helpers.defaultUser.password)
    })

    test('Toggle functionality works...', async ({ page }) => {
      await expect(page.getByTestId('create-toggle-button')).toBeVisible()
      await page.getByTestId('create-toggle-button').click()
      await expect(page.getByTestId('create-toggle-button')).not.toBeVisible()
      await expect(page.getByTestId('create-cancel-button')).toBeVisible()
      await page.getByTestId('create-cancel-button').click()
      await expect(page.getByTestId('create-toggle-button')).toBeVisible()
      await expect(page.getByTestId('create-cancel-button')).not.toBeVisible()
    })
  
    test('A new blog can be created', async ({ page }) => {
      await helpers.createBlog(page, helpers.defaultBlog.title, helpers.defaultBlog.author, helpers.defaultBlog.url)
      await expect(page.getByText(`Blog '${helpers.defaultBlog.title}' created successfully!`)).toBeVisible()
      await expect(page.getByText(`${helpers.defaultBlog.title} - ${helpers.defaultBlog.author}`)).toBeVisible()
    })

    test('Fails to create a blog with invalid data', async ({ page }) => {
      await helpers.createBlog(page, 'Fake Title', "", "")
      await page.pause()
      await expect(page.getByText(`Blog 'Fake Title' creation failed!`)).toBeVisible()
    })
  })
})