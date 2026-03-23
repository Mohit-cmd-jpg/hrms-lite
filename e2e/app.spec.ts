import { expect, test } from '@playwright/test'

test('dashboard renders', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
})

test('employees page renders', async ({ page }) => {
  await page.goto('/employees')
  await expect(page.getByRole('heading', { name: 'Employees' })).toBeVisible()
})

test('attendance page renders', async ({ page }) => {
  await page.goto('/attendance')
  await expect(page.getByRole('heading', { name: 'Attendance' })).toBeVisible()
})
