import { test, expect } from '@playwright/test';

test.describe('Testes na Tabela de Usuários - Playwright Lab', () => {

  // O beforeEach é executado antes de cada teste deste bloco.
  // Ele serve para preparar o cenário (estado inicial) da aplicação.
  test.beforeEach(async ({ page }) => {
    // Navega para a página utilizando a baseURL configurada no playwright.config.ts
    await page.goto('/index.html#tables');

    // Abre o menu de navegação lateral/superior
    await page.getByTestId('nav-menu').click();
    
    // Clica na opção de tabelas para carregar a listagem de usuários
    await page.getByTestId('nav-tables').click();
  });

  // Teste que valida o comportamento ao buscar por um registro que não existe
  test('Buscar por usuário inexistente na tabela exibe zero resultados', async ({ page }) => {
    
    // 1. Digita o nome de um usuário que não está cadastrado no campo de busca
    await page.getByTestId('table-search').fill('Bruno');

    // 2. Armazena o elemento de rodapé da tabela em uma constante e valida a mensagem de contagem
    const tableInfo = page.getByTestId('table-info');
    await expect(tableInfo).toHaveText('Showing 1-0 of 0 entries');

    // 3. Garante de forma asseriva que nenhuma célula contendo o nome "Bruno" está visível na tabela
    await expect(page.getByRole('cell', { name: 'Bruno' })).not.toBeVisible();
    
  });

});