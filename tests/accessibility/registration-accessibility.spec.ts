import { expect, test } from '../../src/fixtures/test.js';

test('FRM-07/A11Y-02: associa labels e nomes acessíveis aos campos obrigatórios', async ({ page, registrationPage }) => {
  // Acessa a página que contém o formulário a ser avaliado.
  await registrationPage.goto();

  // Verifica se os campos obrigatórios podem ser localizados por seus nomes acessíveis.
  await expect(page.getByLabel('Full Name *')).toBeVisible();
  await expect(page.getByLabel('Email Address *')).toBeVisible();
  await expect(page.getByLabel('Password *')).toBeVisible();
  // Confirma que o botão de cadastro também possui nome acessível.
  await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
});
