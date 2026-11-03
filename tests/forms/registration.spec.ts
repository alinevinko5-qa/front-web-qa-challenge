import { expect, test } from '@playwright/test';

test.describe('Registration form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('rejects an invalid email address', async ({ page }) => {
    await page.getByTestId('input-fullname').fill('Taylor Example');
    await page.getByTestId('input-email').fill('not-an-email');
    await page.getByTestId('input-password').fill('StrongPass123!');
    await page.getByTestId('check-terms').check();
    await page.getByTestId('btn-register').click();

    const emailError = page.getByTestId('error-email');
    await expect(emailError).toBeVisible();
    await expect(emailError).not.toBeEmpty();
    await expect(page.getByTestId('form-success')).toBeHidden();
  });

  test('registers with valid required information', async ({ page }) => {
    await page.getByTestId('input-fullname').fill('Taylor Example');
    await page.getByTestId('input-email').fill('taylor@example.test');
    await page.getByTestId('input-password').fill('StrongPass123!');
    await page.getByTestId('check-terms').check();
    await page.getByTestId('btn-register').click();

    await expect(page.getByTestId('form-success')).toBeVisible();
  });
});
