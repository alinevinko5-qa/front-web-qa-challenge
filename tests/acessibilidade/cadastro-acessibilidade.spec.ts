import { expect, test } from '../../src/fixtures/test.js';
import { criarCapturaDeEtapas } from '../../src/fixtures/capturar-etapa.js';

test.describe('Acessibilidade do formulário de cadastro', () => {
  test('FRM-07/A11Y-02: associa rótulos e nomes acessíveis aos campos obrigatórios', async ({ page, registrationPage }, testInfo) => {
    const capturarEtapa = criarCapturaDeEtapas(page, testInfo);

    // Acessa a página que contém o formulário a ser avaliado.
    await registrationPage.goto();
    await capturarEtapa('formulario-aberto');

    // Verifica se os campos obrigatórios podem ser localizados por seus nomes acessíveis.
    await expect(page.getByLabel('Full Name *')).toBeVisible();
    await expect(page.getByLabel('Email Address *')).toBeVisible();
    await expect(page.getByLabel('Password *')).toBeVisible();
    // Confirma que o botão de cadastro também possui nome acessível.
    await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
    await capturarEtapa('rotulos-e-nome-acessivel-verificados');
  });
});
