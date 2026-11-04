import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './Spec',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  reporter: [['list'], ['html', { open: 'never' }]],
  outputDir: 'test-results',
  use: {
    baseURL: process.env.BASE_URL || 'https://playwrightlab.github.io',
    screenshot: 'on',
    trace: 'off',
    video: 'off',
    headless: true,

    launchOptions: {
      slowMo: 500, // Atraso de 500ms em cada ação
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: '**/Responsividade/**/*.spec.ts',
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: '**/Responsividade/**/*.spec.ts',
    },
    {
      name: 'mobile-chromium',
      use: { ...devices['Pixel 7'] },
      testMatch: '**/Responsividade/**/*.spec.ts',
    },
  ],
});