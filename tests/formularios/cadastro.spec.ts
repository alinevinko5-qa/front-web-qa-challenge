import { expect, test } from '../../src/fixtures/test.js';
import { invalidEmailRegistration, validRegistration } from '../../src/data/registration.js';
import { criarCapturaDeEtapas } from '../../src/fixtures/capturar-etapa.js';

test.describe('Formulário de cadastro', () => {
  test.beforeEach(async ({ registrationPage }) => {
    // Abre a aplicação na página que contém o formulário de cadastro.
    await registrationPage.goto();
  });

  test('FRM-03/06: rejeita e-mail inválido e apresenta mensagem de validação', async ({ page, registrationPage }, testInfo) => {
    const capturarEtapa = criarCapturaDeEtapas(page, testInfo);
    await capturarEtapa('formulario-inicial');

    // Preenche o formulário com dados fictícios e um endereço inválido.
    await registrationPage.fill(invalidEmailRegistration);
    await capturarEtapa('dados-invalidos-preenchidos');

    await registrationPage.submit();
    await capturarEtapa('formulario-enviado');

    // Confirma que a validação é exibida e que o cadastro não foi concluído.
    const emailError = registrationPage.emailError();
    await expect(emailError).toBeVisible();
    await expect(emailError).not.toBeEmpty();
    await expect(registrationPage.successMessage()).toBeHidden();
    await capturarEtapa('validacao-de-email-exibida');
  });

  test('FRM-01: realiza o cadastro com informações obrigatórias válidas', async ({ page, registrationPage }, testInfo) => {
    const capturarEtapa = criarCapturaDeEtapas(page, testInfo);
    await capturarEtapa('formulario-inicial');

    // Preenche os campos obrigatórios com dados fictícios válidos e envia o formulário.
    await registrationPage.fill(validRegistration);
    await capturarEtapa('formulario-preenchido');

    await registrationPage.submit();
    await capturarEtapa('formulario-enviado');

    // Verifica a mensagem de confirmação do cadastro.
    await expect(registrationPage.successMessage()).toBeVisible();
    await capturarEtapa('cadastro-confirmado');
  });
});
