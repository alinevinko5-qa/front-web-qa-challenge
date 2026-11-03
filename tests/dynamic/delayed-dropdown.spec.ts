import { expect, test } from '@playwright/test';

test('loads and selects an asynchronously populated dropdown option', async ({ page }) => {
  await page.goto('/');

  const loadButton = page.getByTestId('load-delayed-dropdown-btn');
  const dropdown = page.getByTestId('delayed-select');

  await expect(dropdown).toBeDisabled();
  await loadButton.click();
  await expect(dropdown).toBeEnabled();
  await expect(dropdown.locator('option')).not.toHaveCount(1);

  await dropdown.selectOption({ index: 1 });
  await expect(dropdown).not.toHaveValue('');
});
