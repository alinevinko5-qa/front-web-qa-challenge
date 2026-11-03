import type { Page } from '@playwright/test';
import type { RegistrationData } from '../data/registration.js';

export class RegistrationPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async fill(data: RegistrationData): Promise<void> {
    await this.page.getByTestId('input-fullname').fill(data.fullName);
    await this.page.getByTestId('input-email').fill(data.email);
    await this.page.getByTestId('input-password').fill(data.password);
    await this.page.getByTestId('check-terms').check();
  }

  async submit(): Promise<void> {
    await this.page.getByTestId('btn-register').click();
  }

  emailError() {
    return this.page.getByTestId('error-email');
  }

  successMessage() {
    return this.page.getByTestId('form-success');
  }
}
