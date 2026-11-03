import type { Page } from '@playwright/test';

export class UsersPage {
  constructor(private readonly page: Page) {}

  get table() {
    return this.page.getByTestId('data-table');
  }

  get rows() {
    return this.table.getByTestId('table-body').locator('tr');
  }

  row(userId: number) {
    return this.table.getByTestId(`table-row-${userId}`);
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async search(query: string): Promise<void> {
    await this.page.getByTestId('table-search').fill(query);
  }

  async getCellTextByHeader(userId: number, columnName: string): Promise<string> {
    const columnIndex = await this.getColumnIndex(columnName);

    return (await this.row(userId).getByRole('cell').nth(columnIndex).innerText()).trim();
  }

  private async getColumnIndex(columnName: string): Promise<number> {
    const headers = await this.table.getByRole('columnheader').allTextContents();
    const columnIndex = headers.findIndex(
      (header) => header.trim().toLowerCase() === columnName.toLowerCase(),
    );

    if (columnIndex < 0) {
      throw new Error(`A coluna "${columnName}" não foi encontrada na tabela de usuários.`);
    }

    return columnIndex;
  }

  searchInput() {
    return this.page.getByTestId('table-search');
  }
}
