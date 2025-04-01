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
})