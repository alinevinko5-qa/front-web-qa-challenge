import { test, expect } from '@playwright/test';

test('Navegar até a seção Tables no Playwright Lab', async ({ page }) => {
  // 1. Navega até a página informada com o fragmento
  await page.goto('https://playwrightlab.github.io/index.html#');

  // 2. Clica no menu suspenso utilizando o data-testid
  await page.getByTestId('nav-menu').click();

  // 3. Clica na opção "Tables" dentro do menu utilizando o data-testid
  await page.getByTestId('nav-tables').click();
});