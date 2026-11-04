import { test, expect } from '@playwright/test';

test('Realizar login no Playwright Lab com sucesso', async ({ page }) => {
  // 1. Navega até a página inicial
  await page.goto('https://playwrightlab.github.io/');

  // 2. Clica no botão de login da navegação
  await page.getByTestId('nav-login').click();

  // 3. Preenche o e-mail
  await page.getByTestId('login-email').fill('test@playlab.com');

  // 4. Preenche a senha
  await page.getByTestId('login-password').fill('Password123');

  // 5. Clica no botão para enviar o formulário
  await page.getByTestId('login-submit').click();

  // 6. Valida que a mensagem "Welcome back!" é exibida na tela
  await expect(page.getByTestId('welcome-message')).toBeVisible();
});