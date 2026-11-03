import { expect, test } from '../../src/fixtures/test.js';
import { criarCapturaDeEtapas } from '../../src/fixtures/capturar-etapa.js';

test.describe('Jornada de usuários em dispositivo móvel', () => {
  test('RSP-02: pesquisa usuários na resolução de dispositivo móvel emulado como Pixel 7', async ({ page, usersPage }, testInfo) => {
    const capturarEtapa = criarCapturaDeEtapas(page, testInfo);

    // Acessa a aplicação no projeto configurado com o viewport mobile do Pixel 7.
    await usersPage.goto();
    await capturarEtapa('tabela-mobile-carregada');

    // Confirma que a tabela e o campo de pesquisa estão disponíveis em tela reduzida.
    await expect(usersPage.table).toBeVisible();
    await expect(usersPage.searchInput()).toBeVisible();
    await capturarEtapa('tabela-e-busca-visiveis');

    // Pesquisa um usuário e valida o resultado apresentado na tabela mobile.
    await usersPage.search('Alice Johnson');

    await expect(usersPage.rows).toHaveCount(1);
    await expect(usersPage.rows.first()).toContainText('alice@example.com');
    await capturarEtapa('resultado-da-busca');
  });
});
