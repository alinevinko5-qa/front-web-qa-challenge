import { test, expect } from '@playwright/test';

test.describe('Testes na Tabela de Usuários - Playwright Lab', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html#tables');
    await page.getByTestId('nav-menu').click();
    await page.getByTestId('nav-tables').click();
  });

  test('Validar exibição do quadro e navegação entre as páginas', async ({ page }) => {
    // 1. Valida que a página 1 está ativa inicialmente
    const page1Btn = page.getByTestId('page-1');
    await expect(page1Btn).toHaveClass(/active/);

    // 2. Clica no botão da página 2 e valida que ela se tornou ativa
    const page2Btn = page.getByTestId('page-2');
    await page2Btn.click();
    await expect(page2Btn).toHaveClass(/active/);

    // 3. Clica no botão da página 3 e valida que ela se tornou ativa
    const page3Btn = page.getByTestId('page-3');
    await page3Btn.click();
    await expect(page3Btn).toHaveClass(/active/);

    // 4. Retorna para a página 1 e valida que ela está ativa novamente
    await page1Btn.click();
    await expect(page1Btn).toHaveClass(/active/);
  });

});