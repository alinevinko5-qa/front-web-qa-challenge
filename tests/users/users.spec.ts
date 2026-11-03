import { expect, test } from '@playwright/test';

test.describe('User management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows the user table and filters by a known name', async ({ page }) => {
    const table = page.getByTestId('data-table');
    const rows = table.getByTestId('table-body').locator('tr');

    await expect(table).toBeVisible();
    await expect(table.locator('thead th')).toHaveCount(7);
    await expect(page.getByTestId('sort-id')).toContainText('ID');
    await expect(page.getByTestId('sort-name')).toContainText('Name');
    await expect(page.getByTestId('sort-email')).toContainText('Email');
    await expect(page.getByTestId('col-role')).toContainText('Role');
    await expect(page.getByTestId('sort-status')).toContainText('Status');
    await expect(page.getByTestId('col-actions')).toContainText('Actions');
    await expect(rows).toHaveCount(5);

    await page.getByTestId('table-search').fill('Alice Johnson');

    await expect(rows).toHaveCount(1);
    await expect(rows.first()).toContainText('alice@example.com');
  });

  test('sorts users and moves to the next page', async ({ page }) => {
    const table = page.getByTestId('data-table');
    const rows = table.getByTestId('table-body').locator('tr');
    const pageSize = page.getByTestId('rows-per-page');

    await pageSize.selectOption('15');
    await page.getByTestId('sort-name').click();
    const firstSort = await rows.locator('td:nth-child(3)').allTextContents();
    const ascendingNames = [...firstSort].sort((a, b) => a.localeCompare(b));
    const descendingNames = [...ascendingNames].reverse();
    expect([ascendingNames, descendingNames]).toContainEqual(firstSort);

    await page.getByTestId('sort-name').click();
    const secondSort = await rows.locator('td:nth-child(3)').allTextContents();
    expect(secondSort).not.toEqual(firstSort);
    expect([ascendingNames, descendingNames]).toContainEqual(secondSort);

    await pageSize.selectOption('5');
    await page.getByTestId('page-2').click();

    await expect(rows).toHaveCount(5);
    await expect(page.getByTestId('page-2')).toHaveClass(/active/);
  });
});
