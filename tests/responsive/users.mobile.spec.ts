import { expect, test } from '../../src/fixtures/test.js';

test('RSP-02: pesquisa usuários na resolução mobile do Pixel 7', async ({ usersPage }) => {
  // Acessa a aplicação no projeto configurado com o viewport mobile do Pixel 7.
  await usersPage.goto();

  // Confirma que a tabela e o campo de pesquisa estão disponíveis em tela reduzida.
  await expect(usersPage.table).toBeVisible();
  await expect(usersPage.searchInput()).toBeVisible();

  // Pesquisa um usuário e valida o resultado apresentado na tabela mobile.
  await usersPage.search('Alice Johnson');

  await expect(usersPage.rows).toHaveCount(1);
  await expect(usersPage.rows.first()).toContainText('alice@example.com');
});
