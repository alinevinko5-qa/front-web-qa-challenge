import { expect, test } from '../../src/fixtures/test.js';

test('DYN-01/02: carrega e seleciona uma opção preenchida de forma assíncrona no menu suspenso', async ({ delayedDropdownPage }) => {
  // Abre a aplicação e localiza o componente que recebe opções de forma assíncrona.
  await delayedDropdownPage.goto();
  const { dropdown } = delayedDropdownPage;

  // Confirma que o menu começa desabilitado e solicita o carregamento das opções.
  await expect(dropdown).toBeDisabled();
  await delayedDropdownPage.loadOptions();

  // Aguarda o menu ser habilitado e receber opções sem utilizar espera fixa.
  await expect(dropdown).toBeEnabled();
  await expect(dropdown.locator('option')).not.toHaveCount(1);

  // Seleciona uma opção carregada e confirma que a seleção foi aplicada.
  await delayedDropdownPage.selectFirstAvailableOption();
  await expect(dropdown).not.toHaveValue('');
});
