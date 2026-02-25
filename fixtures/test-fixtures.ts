// fixtures/test-fixtures.ts
import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';
import { CartPage } from '../pages/cart.page';
import { config } from '../utils/config';

type Fixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await use(loginPage);
  },

  productsPage: async ({ loginPage }, use) => {
    const productsPage = await loginPage.login(config.users.standard, config.password);
    await expect(productsPage.title).toHaveText('Products');
    await use(productsPage);
  },
  
});

export { expect };