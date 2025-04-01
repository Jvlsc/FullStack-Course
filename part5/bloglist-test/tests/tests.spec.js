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
      await helpers.createBlog(page, helpers.blogs[0].title, helpers.blogs[0].author, helpers.blogs[0].url)
      await expect(page.getByText(`Blog '${helpers.blogs[0].title}' created successfully!`)).toBeVisible()
      await expect(page.getByText(`${helpers.blogs[0].title} - ${helpers.blogs[0].author}`)).toBeVisible()
    })

    test('Fails to create a blog with invalid data', async ({ page }) => {
      await helpers.createBlog(page, 'Fake Title', "", "")
      await expect(page.getByText(`Blog 'Fake Title' creation failed!`)).toBeVisible()
    })

    test(`Like functionality works...`, async ({ page }) => {
      await helpers.createBlog(page, helpers.blogs[0].title, helpers.blogs[0].author, helpers.blogs[0].url)
      await expect(page.getByText(`Blog '${helpers.blogs[0].title}' created successfully!`)).toBeVisible()
      await expect(page.getByText(`${helpers.blogs[0].title} - ${helpers.blogs[0].author}`)).toBeVisible()
      await page.getByTestId('blog-show-button').last().click()

      await page.getByTestId('blog-like-button').last().click();
      await expect(page.getByTestId('blog-likes-text').last()).toHaveText('1')

      await page.getByTestId('blog-like-button').last().click();
      await expect(page.getByTestId('blog-likes-text').last()).toHaveText('2')
    })

    test('A blog can be deleted...', async ({ page }) => {
      await helpers.createBlog(page, helpers.blogs[0].title, helpers.blogs[0].author, helpers.blogs[0].url)
      await expect(page.getByText(`Blog '${helpers.blogs[0].title}' created successfully!`)).toBeVisible()
      await expect(page.getByText(`${helpers.blogs[0].title} - ${helpers.blogs[0].author}`)).toBeVisible()
      await page.getByTestId('blog-show-button').last().click()
      
      page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('confirm')
        await dialog.accept()
      })
      
      await page.getByTestId('blog-delete-button').last().click()
      await expect(page.getByText(`Blog '${helpers.blogs[0].title}' deleted successfully!`)).toBeVisible()
    })

    test('Logout functionality works...', async ({ page }) => {
      await helpers.logout(page)
      await expect(page.getByTestId('blog-delete-button')).not.toBeVisible()
      await expect(page.getByText('Login:')).toBeVisible()
    })

    test('Delete button is not visible when not logged in...', async ({ page }) => {
      await helpers.createBlog(page, helpers.blogs[0].title, helpers.blogs[0].author, helpers.blogs[0].url)
      await expect(page.getByText(`Blog '${helpers.blogs[0].title}' created successfully!`)).toBeVisible()
      await expect(page.getByText(`${helpers.blogs[0].title} - ${helpers.blogs[0].author}`)).toBeVisible()
      
      await helpers.logout(page)
      await expect(page.getByTestId('blog-delete-button')).not.toBeVisible()
      await expect(page.getByText('Login:')).toBeVisible()

      await helpers.loginWith(page, helpers.testUser.username, helpers.testUser.password)
      await expect(page.getByText('Test User logged in')).toBeVisible()

      await page.getByTestId('blog-show-button').last().click()
      await expect(page.getByTestId('blog-delete-button')).not.toBeVisible()
      await expect(page.getByText('Delete')).not.toBeVisible()
    })

    test('Blog list is sorted by likes...', async ({ page }) => {
      await helpers.createBlog(page, helpers.blogs[0].title, helpers.blogs[0].author, helpers.blogs[0].url)
      await expect(page.getByText(`Blog '${helpers.blogs[0].title}' created successfully!`)).toBeVisible()
      await page.getByTestId('blog-show-button').last().click()

      await helpers.createBlog(page, helpers.blogs[1].title, helpers.blogs[1].author, helpers.blogs[1].url)
      await expect(page.getByText(`Blog '${helpers.blogs[1].title}' created successfully!`)).toBeVisible()
      await page.getByTestId('blog-show-button').last().click()

      await helpers.createBlog(page, helpers.blogs[2].title, helpers.blogs[2].author, helpers.blogs[2].url)
      await expect(page.getByText(`Blog '${helpers.blogs[2].title}' created successfully!`)).toBeVisible()
      await page.getByTestId('blog-show-button').last().click()

      const blog1 = page.getByText(helpers.blogs[0].title)
      const blog1Likes = blog1.getByTestId('blog-likes-text').filter({ near: helpers.blogs[0].title })
      const blog1LikesButton = blog1.getByTestId('blog-like-button').filter({ hasText: 'Like', near: helpers.blogs[0].title })

      const blog2 = page.getByText(helpers.blogs[1].title)
      const blog2Likes = blog2.getByTestId('blog-likes-text').filter({ near: helpers.blogs[1].title })
      const blog2LikesButton = blog2.getByTestId('blog-like-button').filter({ hasText: 'Like', near: helpers.blogs[1].title })

      const blog3 = page.getByText(helpers.blogs[2].title)
      const blog3Likes = blog3.getByTestId('blog-likes-text').filter({ near: helpers.blogs[2].title })
      const blog3LikesButton = blog3.getByTestId('blog-like-button').filter({ hasText: 'Like', near: helpers.blogs[2].title })
      
      await blog1LikesButton.click()
      await expect(blog1Likes).toHaveText('1')

      await blog1LikesButton.click()
      await expect(blog1Likes).toHaveText('2')

      await blog2LikesButton.click()
      await expect(blog2Likes).toHaveText('1')

      await blog3LikesButton.click()
      await expect(blog3Likes).toHaveText('1')

      await blog3LikesButton.click()
      await expect(blog3Likes).toHaveText('2')

      await blog3LikesButton.click()
      await expect(blog3Likes).toHaveText('3')

      const blogsLikesTexts = await page.getByTestId('blog-likes-text').all()
      const likes = await Promise.all(blogsLikesTexts.map(el => el.textContent()))

      expect(Number(likes[0])).toBeGreaterThan(Number(likes[1]))
      expect(Number(likes[1])).toBeGreaterThan(Number(likes[2]))
    })
  })
})