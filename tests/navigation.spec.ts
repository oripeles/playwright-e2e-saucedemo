import { test, expect } from '../fixtures/test-fixtures';

const PRODUCT_1 = 'Sauce Labs Backpack';

test.describe('Logout & Navigation Tests @regression', () => {
  test('TC-NAV-01 – Open and close side menu', async ({ productsPage }) => {
    await productsPage.sideMenu.openMenu();

    await expect.soft(productsPage.sideMenu.allItemsLink).toBeVisible();
    await expect.soft(productsPage.sideMenu.aboutLink).toBeVisible();
    await expect.soft(productsPage.sideMenu.logoutLink).toBeVisible();
    await expect.soft(productsPage.sideMenu.resetLink).toBeVisible();

    await productsPage.sideMenu.closeMenu();

    await expect(productsPage.sideMenu.closeButton).toBeHidden();
    await expect(productsPage.title).toHaveText('Products');
  });

  test('TC-NAV-02 – Logout redirects user to Login page @smoke', async ({ productsPage }) => {
    await productsPage.sideMenu.logout();

    await expect(productsPage.page).toHaveURL('https://www.saucedemo.com/');
    await expect(productsPage.page.getByTestId('username')).toBeVisible();
    await expect(productsPage.page.getByTestId('password')).toBeVisible();
    await expect(productsPage.page.getByTestId('login-button')).toBeVisible();
  });

  test('TC-NAV-03 – Cannot access Products page after logout', async ({ productsPage }) => {
    await productsPage.sideMenu.logout();

    await productsPage.page.goto('/inventory.html');
    await expect(productsPage.page).toHaveURL('https://www.saucedemo.com/');
    await expect(productsPage.page.getByTestId('login-button')).toBeVisible();
  });

  test('TC-NAV-04 – Direct navigation to protected URL without login', async ({ productsPage }) => {
    await productsPage.sideMenu.logout();

    await productsPage.page.goto('/cart.html');
    await expect(productsPage.page).toHaveURL('https://www.saucedemo.com/');
    await expect(productsPage.page.getByTestId('login-button')).toBeVisible();

    await productsPage.page.goto('/checkout-step-one.html');
    await expect(productsPage.page).toHaveURL('https://www.saucedemo.com/');
    await expect(productsPage.page.getByTestId('login-button')).toBeVisible();
  });

  test('TC-NAV-05 – Cart icon navigates correctly', async ({ productsPage }) => {
    await productsPage.cartIcon.click();

    await expect(productsPage.page).toHaveURL(/cart\.html/);
    await expect(productsPage.page.getByTestId('title')).toHaveText('Your Cart');
  });

  test('TC-NAV-06 – Reset App State clears cart and restores product button state', async ({ productsPage }) => {
    await productsPage.addProductToCart(PRODUCT_1);
    await expect(productsPage.cartBadge).toHaveText('1');

    await productsPage.sideMenu.resetAppState();

    await expect(productsPage.cartBadge).toHaveCount(0);

    await productsPage.cartIcon.click();
    await expect(productsPage.page.getByTestId('inventory-item')).toHaveCount(0);

    await productsPage.page.goto('/inventory.html');

    const item = productsPage.inventoryItems.filter({ hasText: PRODUCT_1 });
    await expect(item.getByTestId(/^add-to-cart/)).toBeVisible();
    await expect(item.getByTestId(/^remove/)).toHaveCount(0);
  });
});