import { test, expect } from '@playwright/test';
import path from 'path';

test('UP-01 - Realizar upload de um arquivo válido e validar mensagem de sucesso', async ({ page }) => {
  await page.goto('/index.html'); // Ajuste para a URL ou rota do seu ambiente

  // 1. Mapeia o input de arquivo oculto e o botão de upload usando os seletores da página
  const fileInput = page.locator('#singleFileInput');
  const uploadButton = page.getByTestId('single-upload-btn');

  // 2. Mapeia a mensagem de sucesso utilizando o data-testid fornecido
  const successStatus = page.getByTestId('single-upload-status');

  // 3. Define o caminho do arquivo de teste que será enviado
  const filePath = path.resolve(__dirname, '../../fixtures/teste.txt');

  // 4. Insere o arquivo programaticamente no input (simulando a escolha do arquivo)
  await fileInput.setInputFiles(filePath);

  // 5. Clica no botão "Upload" para disparar o envio
  await uploadButton.click();

  // 6. Valida se a mensagem de sucesso exibe exatamente o texto esperado e está visível na tela
  await expect(successStatus).toBeVisible();
  await expect(successStatus).toHaveText('Uploaded successfully!');
});