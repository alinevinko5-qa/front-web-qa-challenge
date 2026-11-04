import { test, expect } from '@playwright/test';

test.describe('Testes na Tabela de Usuários - Playwright Lab', () => {

  test.beforeEach(async ({ page }) => {
    // Como a baseURL já está configurada no config.ts, usamos apenas o caminho relativo
    await page.goto('/index.html#tables');

    // Abre o menu e clica na opção Tables
    await page.getByTestId('nav-menu').click();
    await page.getByTestId('nav-tables').click();
  });

  test('Buscar por usuário inexistente na tabela exibe zero resultados', async ({ page }) => {
    // 1. Digita o nome do usuário que não existe
    await page.getByTestId('table-search').fill('Bruno');

    // 2. Valida que o rodapé da tabela informa que não há registros correspondentes
    const tableInfo = page.getByTestId('table-info');
    await expect(tableInfo).toHaveText('Showing 1-0 of 0 entries');

    // 3. Garante que nenhuma célula com o nome "Bruno" está visível na tabela
    await expect(page.getByRole('cell', { name: 'Bruno' })).not.toBeVisible();
  });

});