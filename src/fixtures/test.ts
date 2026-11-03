import { test as base, expect } from '@playwright/test';
import { DelayedDropdownPage } from '../pages/delayed-dropdown.page.js';
import { RegistrationPage } from '../pages/registration.page.js';
import { UsersPage } from '../pages/users.page.js';

type TestFixtures = {
  delayedDropdownPage: DelayedDropdownPage;
  registrationPage: RegistrationPage;
  usersPage: UsersPage;
};

export const test = base.extend<TestFixtures>({
  delayedDropdownPage: async ({ page }, use) => {
    await use(new DelayedDropdownPage(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
  usersPage: async ({ page }, use) => {
    await use(new UsersPage(page));
  },
});

export { expect };
