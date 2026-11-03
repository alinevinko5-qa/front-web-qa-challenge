import type { Page } from '@playwright/test';

export class DelayedDropdownPage {
  constructor(private readonly page: Page) {}

  get dropdown() {
    return this.page.getByTestId('delayed-select');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async loadOptions(): Promise<void> {
    await this.page.getByTestId('load-delayed-dropdown-btn').click();
  }

  async selectFirstAvailableOption(): Promise<void> {
    const availableOptions = this.dropdown.locator('option:not([value=""])');
    const optionValue = await availableOptions.first().getAttribute('value');

    if (optionValue === null) {
      throw new Error('Nenhuma opção disponível foi carregada no menu suspenso.');
    }

    await this.dropdown.selectOption(optionValue);
  }
}
