import { test as base, expect } from '@playwright/test';
import { UsersPage } from '../pages/users.page.js';

type TestFixtures = {
  usersPage: UsersPage;
};

export const test = base.extend<TestFixtures>({
  usersPage: async ({ page }, use) => {
    await use(new UsersPage(page));
  },
});

export { expect };
