
const { test, describe, expect } = require('@playwright/test')

describe('Phonebook', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('')
    await expect(page.getByText('Phonebook')).toBeVisible()
    await expect(page.getByText('Numbers')).toBeVisible()
  }),
  test('can add a contact', async ({ page }) => {
    await page.goto('/')

    const name = 'Vero'
    const inputs = page.getByRole('textbox')

    await inputs.nth(1).fill(name)
    await inputs.nth(2).fill('040-123456')

    await page.getByRole('button', { name: 'add' }).click()

    await expect(page.getByText(`${name} 040-123456`)).toBeVisible()
  })
})
