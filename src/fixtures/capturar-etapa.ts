import type { Page, TestInfo } from '@playwright/test';

export function criarCapturaDeEtapas(page: Page, testInfo: TestInfo) {
  testInfo.setTimeout(Math.max(testInfo.timeout, 90_000));
  let numeroDaEtapa = 0;

  return async (nome: string): Promise<void> => {
    numeroDaEtapa += 1;
    const numero = String(numeroDaEtapa).padStart(2, '0');

    await page.screenshot({
      path: testInfo.outputPath(`${numero}-${nome}.png`),
      fullPage: true,
    });
  };
}
