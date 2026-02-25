import { test, expect } from '../fixtures/test-fixtures';

const PRODUCTS = {
  backpack: { name: 'Sauce Labs Backpack', price: '$29.99' },
  tshirt: { name: 'Sauce Labs Bolt T-Shirt', price: '$15.99' },
};

test.describe('Cart Tests @regression', () => {

  test('TC-CART-01 – Cart is empty initially', async ({ productsPage }) => {
    const cartPage = await productsPage.openCart();

    await expect(cartPage.cartItems).toHaveCount(0);
    await expect(cartPage.cartBadge).toHaveCount(0);
  });

  test('TC-CART-02 – Added product appears in cart @smoke', async ({ productsPage }) => {
    await productsPage.addProductToCart(PRODUCTS.backpack.name);

    const cartPage = await productsPage.openCart();

    await expect.soft(cartPage.productNames)
      .toHaveText([PRODUCTS.backpack.name]);
    await expect.soft(cartPage.productPrices)
      .toHaveText([PRODUCTS.backpack.price]);
    await expect.soft(cartPage.quantities)
      .toHaveText(['1']);
    await expect.soft(cartPage.cartBadge)
      .toHaveText('1');
  });

  test('TC-CART-03 – Multiple products appear correctly in cart', async ({ productsPage }) => {
    await productsPage.addProductToCart(PRODUCTS.backpack.name);
    await productsPage.addProductToCart(PRODUCTS.tshirt.name);

    const cartPage = await productsPage.openCart();

    await expect(cartPage.productNames).toHaveCount(2);
    await expect(cartPage.cartBadge).toHaveText('2');
  });

  test('TC-CART-04 – Remove product from cart @smoke', async ({ productsPage }) => {
    await productsPage.addProductToCart(PRODUCTS.backpack.name);

    const cartPage = await productsPage.openCart();
    await cartPage.removeProductByName(PRODUCTS.backpack.name);

    await expect(cartPage.cartItems).toHaveCount(0);
    await expect(cartPage.cartBadge).toHaveCount(0);
  });

  test('TC-CART-05 – Continue shopping navigates back to Products page', async ({ productsPage }) => {
    await productsPage.addProductToCart(PRODUCTS.backpack.name);

    const cartPage = await productsPage.openCart();
    await cartPage.continueShopping();

    await expect(productsPage.title).toHaveText('Products');
  });

  test('TC-CART-06 – Checkout button navigates to checkout page', async ({ productsPage }) => {
    await productsPage.addProductToCart(PRODUCTS.backpack.name);

    const cartPage = await productsPage.openCart();
    const checkoutPage = await cartPage.goToCheckout();

    await expect(checkoutPage.page).toHaveURL(/checkout-step-one/);
  });

});