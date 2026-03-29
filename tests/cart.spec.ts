import { test, expect } from '../fixtures/test-fixtures';

const PRODUCTS = {
  backpack: { name: 'Sauce Labs Backpack', price: '$29.99' },
  tshirt: { name: 'Sauce Labs Bolt T-Shirt', price: '$15.99' },
};

test.describe('Cart Tests', { tag: '@regression' }, () => {
  test('TC-CART-01 – Cart is empty initially', async ({ productsPage }) => {
    const cartPage = await test.step('Open cart', async () => {
      return await productsPage.openCart();
    });

    await test.step('Verify cart is empty', async () => {
      await expect(cartPage.cartItems).toHaveCount(0);
      await expect(cartPage.cartBadge).toHaveCount(0);
    });
  });

  test(
    'TC-CART-02 – Added product appears in cart',
    { tag: '@smoke' },
    async ({ productsPage }) => {
      await test.step('Add backpack to cart', async () => {
        await productsPage.addProductToCart(PRODUCTS.backpack.name);
      });

      const cartPage = await test.step('Open cart', async () => {
        return await productsPage.openCart();
      });

      await test.step('Verify product details in cart', async () => {
        await expect.soft(cartPage.productNames).toHaveText([PRODUCTS.backpack.name]);
        await expect.soft(cartPage.productPrices).toHaveText([PRODUCTS.backpack.price]);
        await expect.soft(cartPage.quantities).toHaveText(['1']);
        await expect.soft(cartPage.cartBadge).toHaveText('1');
      });
    },
  );

  test('TC-CART-03 – Multiple products appear correctly in cart', async ({ productsPage }) => {
    await test.step('Add two products to cart', async () => {
      await productsPage.addProductToCart(PRODUCTS.backpack.name);
      await productsPage.addProductToCart(PRODUCTS.tshirt.name);
    });

    const cartPage = await test.step('Open cart', async () => {
      return await productsPage.openCart();
    });

    await test.step('Verify both products in cart', async () => {
      await expect(cartPage.productNames).toHaveCount(2);
      await expect(cartPage.cartBadge).toHaveText('2');
    });
  });

  test('TC-CART-04 – Remove product from cart', { tag: '@smoke' }, async ({ productsPage }) => {
    await test.step('Add backpack to cart', async () => {
      await productsPage.addProductToCart(PRODUCTS.backpack.name);
    });

    const cartPage = await test.step('Open cart and remove product', async () => {
      const cartPage = await productsPage.openCart();
      await cartPage.removeProductByName(PRODUCTS.backpack.name);
      return cartPage;
    });

    await test.step('Verify cart is empty', async () => {
      await expect(cartPage.cartItems).toHaveCount(0);
      await expect(cartPage.cartBadge).toHaveCount(0);
    });
  });

  test('TC-CART-05 – Continue shopping navigates back to Products page', async ({
    productsPage,
  }) => {
    await test.step('Add product and open cart', async () => {
      await productsPage.addProductToCart(PRODUCTS.backpack.name);
    });

    await test.step('Click continue shopping', async () => {
      const cartPage = await productsPage.openCart();
      await cartPage.continueShopping();
    });

    await test.step('Verify back on products page', async () => {
      await expect(productsPage.title).toHaveText('Products');
    });
  });

  test('TC-CART-06 – Checkout button navigates to checkout page', async ({ productsPage }) => {
    await test.step('Add product and open cart', async () => {
      await productsPage.addProductToCart(PRODUCTS.backpack.name);
    });

    const checkoutPage = await test.step('Click checkout', async () => {
      const cartPage = await productsPage.openCart();
      return await cartPage.goToCheckout();
    });

    await test.step('Verify on checkout page', async () => {
      await expect(checkoutPage.page).toHaveURL(/checkout-step-one/);
    });
  });
});
