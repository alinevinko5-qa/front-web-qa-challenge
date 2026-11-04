import { test, expect } from '@playwright/test';

test('DYN-02 - Configurar delay de 3 segundos e carregar conteúdo dinâmico', async ({ page }) => {
  await page.goto('/index.html'); // Ajuste para a URL ou rota do seu ambiente

  // 1. Mapeia os elementos usando os data-testids fornecidos
  const delaySelect = page.getByTestId('delay-select');
  const loadButton = page.getByTestId('load-delayed-btn');
  const successMessage = page.locator('text=Content Loaded Successfully!');

  // 2. Seleciona a opção de 3 segundos no combobox
  await delaySelect.selectOption('3');

  // 3. Clica no botão para iniciar o carregamento com delay
  await loadButton.click();

  // 4. Valida se a mensagem de sucesso aparece na tela após a espera assíncrona
  // O Playwright aguarda automaticamente (auto-waiting) pelo tempo configurado no componente
  await expect(successMessage).toBeVisible({ timeout: 5000 });
});