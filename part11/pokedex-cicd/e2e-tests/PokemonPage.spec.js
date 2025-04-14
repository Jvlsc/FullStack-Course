const { test, describe, expect } = require('@playwright/test')

describe('Pokedex', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('')
    await expect(page.getByText('ivysaur')).toBeVisible()
    await expect(page.getByText('Pokémon and Pokémon character names are trademarks of Nintendo.')).toBeVisible()
  })

  test('can navigate to Ivysaur page and see its ability', async ({ page }) => {
    await page.goto('')
    await page.getByText('ivysaur').click()

    // Verify we're on the correct Pokemon's page:
    await expect(page.locator('.pokemon-name')).toHaveText('ivysaur')

    // Verify Ivysaur's habilities:
    await expect(page.getByText('chlorophyll')).toBeVisible()
    await expect(page.getByText('overgrow')).toBeVisible()
  })
})