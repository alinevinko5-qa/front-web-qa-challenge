import { expect, test } from '../../src/fixtures/test.js';
import { invalidEmailRegistration, validRegistration } from '../../src/data/registration.js';

test.describe('Formulário de cadastro', () => {
  test.beforeEach(async ({ registrationPage }) => {
    // Abre a aplicação na página que contém o formulário de cadastro.
    await registrationPage.goto();
  });

  test('FRM-03/06: rejeita e-mail inválido e apresenta mensagem de validação', async ({ registrationPage }) => {
    // Preenche o formulário com dados fictícios e um endereço inválido.
    await registrationPage.fill(invalidEmailRegistration);
    await registrationPage.submit();

    // Confirma que a validação é exibida e que o cadastro não foi concluído.
    const emailError = registrationPage.emailError();
    await expect(emailError).toBeVisible();
    await expect(emailError).not.toBeEmpty();
    await expect(registrationPage.successMessage()).toBeHidden();
  });

  test('FRM-01: realiza o cadastro com informações obrigatórias válidas', async ({ registrationPage }) => {
    // Preenche os campos obrigatórios com dados fictícios válidos e envia o formulário.
    await registrationPage.fill(validRegistration);
    await registrationPage.submit();

    // Verifica a mensagem de confirmação do cadastro.
    await expect(registrationPage.successMessage()).toBeVisible();
  });
});
