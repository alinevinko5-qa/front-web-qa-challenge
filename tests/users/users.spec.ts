import { expect, test } from '../../src/fixtures/test.js';

test.describe('Jornada principal - gerenciamento de usuários', () => {
  test('USR-01/02/03/04/07: valida tabela, pesquisa e situação dos usuários', async ({ page, usersPage }) => {
    // Acessa a aplicação e localiza a tabela de usuários.
    await usersPage.goto();
    const table = usersPage.table;
    const rows = usersPage.rows;

    // Valida o carregamento, os cabeçalhos e a apresentação inicial da tabela.
    await expect(table).toBeVisible();
    await expect(table.locator('thead th')).toHaveCount(7);
    await expect(page.getByTestId('sort-id')).toContainText('ID');
    await expect(page.getByTestId('sort-name')).toContainText('Name');
    await expect(page.getByTestId('sort-email')).toContainText('Email');
    await expect(page.getByTestId('col-role')).toContainText('Role');
    await expect(page.getByTestId('sort-status')).toContainText('Status');
    await expect(page.getByTestId('col-actions')).toContainText('Actions');
    await expect(rows).toHaveCount(5);

    // Pesquisa uma pessoa existente e valida e-mail e status apresentados.
    await usersPage.search('Alice Johnson');
    await expect(rows).toHaveCount(1);
    await expect(rows.first()).toContainText('alice@example.com');
    await expect.poll(() => usersPage.getCellTextByHeader(1, 'Status')).toMatch(/^(active|inactive|pending)$/);

    // Pesquisa uma pessoa inexistente e valida que nenhum registro é exibido.
    await usersPage.search('Usuario Inexistente');
    await expect(rows).toHaveCount(0);
  });
});
