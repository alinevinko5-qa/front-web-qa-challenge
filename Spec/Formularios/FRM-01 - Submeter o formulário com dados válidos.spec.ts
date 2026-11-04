import { test, expect } from '@playwright/test';

test.describe('Testes de Cadastro - Playwright Lab', () => {

  test.beforeEach(async ({ page }) => {
    // Acessa diretamente a página principal onde o formulário de cadastro está localizado
    await page.goto('/index.html');
  });

  test('Cadastrar um novo usuário com sucesso', async ({ page }) => {
    // 1. Full Name
    await page.getByTestId('input-fullname').fill('Raquel Fabiana');

    // 2. Email Address
    await page.getByTestId('input-email').fill('raquel.fabiana@example.com');

    // 3. Password
    await page.getByTestId('input-password').fill('Password123');

    // 4. Phone Number
    await page.getByTestId('input-phone').fill('+1 (555) 11 973331234');

    // 5. Date of Birth (formato AAAA-MM-DD exigido por inputs de data)
    await page.getByTestId('input-dob').fill('1983-07-01');

    // 6. Country (selecionando o Brasil pelo value 'br')
    await page.getByTestId('select-country').selectOption('br');

    // 7. Gender (selecionando Female)
    await page.getByTestId('radio-female').click();

    // 8. Terms & Conditions (marcando o checkbox)
    await page.getByTestId('check-terms').check();

    // 9. Register (clicando no botão de cadastro)
    await page.getByTestId('btn-register').click();

    // 10. Validação da mensagem de sucesso na tela
    const successMessage = page.getByTestId('form-success');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toHaveText(/Registration successful! Welcome aboard./i);
  });

});