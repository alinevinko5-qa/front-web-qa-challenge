import { expect, test } from '@playwright/test';

test('searches users at the Pixel 7 mobile viewport', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('data-table')).toBeVisible();
  await expect(page.getByTestId('table-search')).toBeVisible();
  await page.getByTestId('table-search').fill('Alice Johnson');

  const rows = page.getByTestId('data-table').getByTestId('table-body').locator('tr');
  await expect(rows).toHaveCount(1);
  await expect(rows.first()).toContainText('alice@example.com');
});
