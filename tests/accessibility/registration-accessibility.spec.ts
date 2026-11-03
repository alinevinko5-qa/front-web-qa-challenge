import { expect, test } from '@playwright/test';

test('associates accessible names with required registration fields', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByLabel('Full Name *')).toBeVisible();
  await expect(page.getByLabel('Email Address *')).toBeVisible();
  await expect(page.getByLabel('Password *')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
});
