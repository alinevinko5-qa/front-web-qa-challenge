import { test, expect } from '@playwright/test';

test.describe('Testes na Tabela de Usuários - Playwright Lab', () => {

  // O beforeEach executa a navegação antes do teste
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwrightlab.github.io/index.html#');
    await page.getByTestId('nav-menu').click();
    await page.getByTestId('nav-tables').click();
  });

  // Teste de busca por usuário
  test('Buscar por usuário "Alice" na tabela', async ({ page }) => {
    await page.getByTestId('table-search').fill('Alice');
    await expect(page.getByRole('cell', { name: 'Alice Johnson' })).toBeVisible();
  });

});