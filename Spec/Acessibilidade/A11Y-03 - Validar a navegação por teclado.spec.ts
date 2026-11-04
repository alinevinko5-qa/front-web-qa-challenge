import { test, expect } from '@playwright/test';

test.describe('Testes de Cadastro via Teclado - Playwright Lab', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
  });

  test('Preencher o formulário de cadastro navegando com Tab', async ({ page }) => {
    // 1. Foca no primeiro campo (Full Name) para iniciar
    const fullNameInput = page.getByTestId('input-fullname');
    await fullNameInput.focus();

    // Preenche Full Name e avança com Tab
    await page.keyboard.type('Raquel Fabiana');
    await page.keyboard.press('Tab');

    // 2. Email Address
    await page.keyboard.type('raquel.fabiana@example.com');
    await page.keyboard.press('Tab');

    // 3. Password
    await page.keyboard.type('Password123');
    await page.keyboard.press('Tab');

    // 4. Phone Number
    await page.keyboard.type('+1 (555) 11 973331234');
    await page.keyboard.press('Tab');

    // 5. Date of Birth
    await page.keyboard.type('1983-07-01');
    await page.keyboard.press('Tab');

    // 6. Country (Selecionando Brasil)
    await page.getByTestId('select-country').selectOption('br');
    await page.keyboard.press('Tab');

    // 7. Gender (Female)
    await page.getByTestId('radio-female').click();
    await page.keyboard.press('Tab');

    // 8. Terms & Conditions (Marca o checkbox com a barra de espaço ou click)
    await page.getByTestId('check-terms').click();
    await page.keyboard.press('Tab');

    // 9. Register (Pressiona Enter no botão de registrar)
    await page.getByTestId('btn-register').press('Enter');

    // Validação da mensagem de sucesso
    const successMessage = page.getByTestId('form-success');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toHaveText(/Registration successful! Welcome aboard./i);
  });

});