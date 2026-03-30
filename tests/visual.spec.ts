import { test, expect } from '../fixtures/test-fixtures';

test.describe('Visual Regression Tests', { tag: '@visual' }, () => {
  test('TC-VISUAL-01 – Products page', async ({ productsPage }) => {
    await expect(productsPage.page).toHaveScreenshot('products-page.png');
  });

  test('TC-VISUAL-02 – Product details page', async ({ productsPage }) => {
    const detailsPage = await productsPage.openProductDetails('Sauce Labs Backpack');
    await expect(detailsPage.page).toHaveScreenshot('product-details.png');
  });

  test('TC-VISUAL-03 – Cart page (empty)', async ({ productsPage }) => {
    const cartPage = await productsPage.openCart();
    await expect(cartPage.page).toHaveScreenshot('cart-empty.png');
  });

  test('TC-VISUAL-04 – Cart page (with product)', async ({ productsPage }) => {
    await productsPage.addProductToCart('Sauce Labs Backpack');
    const cartPage = await productsPage.openCart();
    await expect(cartPage.page).toHaveScreenshot('cart-with-product.png');
  });

  test('TC-VISUAL-05 – Checkout step one page', async ({ productsPage }) => {
    await productsPage.addProductToCart('Sauce Labs Backpack');
    const cartPage = await productsPage.openCart();
    const checkoutPage = await cartPage.goToCheckout();
    await expect(checkoutPage.page).toHaveScreenshot('checkout-step-one.png');
  });

  test('TC-VISUAL-06 – Side menu open', async ({ productsPage }) => {
    await productsPage.sideMenu.openMenu();
    await expect(productsPage.page).toHaveScreenshot('side-menu-open.png');
  });
});
