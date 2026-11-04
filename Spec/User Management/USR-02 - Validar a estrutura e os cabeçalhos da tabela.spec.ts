import { test, expect } from '@playwright/test';

test.describe('Validação da estrutura do Quadro de Usuários (User Management)', () => {

  test.beforeEach(async ({ page }) => {
    // Como a baseURL já está configurada no config.ts, usamos apenas o caminho relativo
    await page.goto('/index.html#tables');

    // Abre o menu e clica na opção Tables
    await page.getByTestId('nav-menu').click();
    await page.getByTestId('nav-tables').click();
  });

  test('Validar checkbox e colunas da tabela de usuários', async ({ page }) => {
    // 1. Valida o checkbox de seleção geral
    const selectAllCheckbox = page.getByTestId('select-all');
    await expect(selectAllCheckbox).toBeVisible();

    // 2. Lista com os data-testids e os textos esperados de cada coluna
    const colunas = [
      { testId: 'sort-id', texto: 'ID' },
      { testId: 'sort-name', texto: 'Name' },
      { testId: 'sort-email', texto: 'Email' },
      { testId: 'col-role', texto: 'Role' },
      { testId: 'sort-status', texto: 'Status' },
      { testId: 'col-actions', texto: 'Actions' },
    ];

    // Valida de forma automatizada todas as colunas com um único loop
    for (const coluna of colunas) {
      const elemento = page.getByTestId(coluna.testId);
      await expect(elemento).toBeVisible();
      await expect(elemento).toContainText(coluna.texto);
    }
  });
});