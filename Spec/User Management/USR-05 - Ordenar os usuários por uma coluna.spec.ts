import { test, expect } from '@playwright/test';

test.describe('Testes na Tabela de Usuários - Playwright Lab', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html#tables');
    await page.getByTestId('nav-menu').click();
    await page.getByTestId('nav-tables').click();
  });

  test('Filtrar tabela por Role "Viewer" e validar na tela', async ({ page }) => {
    // 1. Seleciona a opção "viewer" no select de filtro por role
    await page.getByTestId('table-filter').selectOption('viewer');

    // 2. Valida diretamente que o primeiro registro listado exibe a role "viewer"
    const primeiroRole = page.locator('tbody tr .status-badge').first();
    await expect(primeiroRole).toHaveText(/viewer/i);
  });

});