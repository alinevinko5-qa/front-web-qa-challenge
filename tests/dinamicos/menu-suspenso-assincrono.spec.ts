import { expect, test } from '../../src/fixtures/test.js';
import { criarCapturaDeEtapas } from '../../src/fixtures/capturar-etapa.js';

test.describe('Menu suspenso com carregamento assíncrono', () => {
  test('DYN-01/02: carrega e seleciona uma opção preenchida de forma assíncrona no menu suspenso', async ({ page, delayedDropdownPage }, testInfo) => {
    const capturarEtapa = criarCapturaDeEtapas(page, testInfo);

    // Abre a aplicação e localiza o componente que recebe opções de forma assíncrona.
    await delayedDropdownPage.goto();
    const { dropdown } = delayedDropdownPage;
    await capturarEtapa('menu-suspenso-inicial');

    // Confirma que o menu começa desabilitado e solicita o carregamento das opções.
    await expect(dropdown).toBeDisabled();
    await delayedDropdownPage.loadOptions();
    await capturarEtapa('carregamento-solicitado');

    // Aguarda o menu ser habilitado e receber opções sem utilizar espera fixa.
    await expect(dropdown).toBeEnabled();
    await expect(dropdown.locator('option')).not.toHaveCount(1);
    await capturarEtapa('opcoes-carregadas');

    // Seleciona uma opção carregada e confirma que a seleção foi aplicada.
    await delayedDropdownPage.selectFirstAvailableOption();
    await expect(dropdown).not.toHaveValue('');
    await capturarEtapa('opcao-selecionada');
  });
});
