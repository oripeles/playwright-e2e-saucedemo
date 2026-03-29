import { test, expect } from '../fixtures/test-fixtures';

const PRODUCTS = {
  backpack: { name: 'Sauce Labs Backpack', price: '$29.99' },
};

test.describe('Products Tests', { tag: '@regression' }, () => {
  test('TC-PROD-01 – Products page is displayed', { tag: '@smoke' }, async ({ productsPage }) => {
    await test.step('Verify products title', async () => {
      await expect(productsPage.title).toHaveText('Products');
    });

    await test.step('Verify products list is not empty', async () => {
      const count = await productsPage.productNames.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test('TC-PROD-02 – Products list contains valid product items', async ({ productsPage }) => {
    await test.step('Verify product elements are visible', async () => {
      await expect.soft(productsPage.productNames.first()).toBeVisible();
      await expect.soft(productsPage.productPrices.first()).toBeVisible();
      await expect.soft(productsPage.addToCartButtons.first()).toBeVisible();
    });
  });

  test('TC-PROD-03 – Sort products by name (A to Z)', async ({ productsPage }) => {
    await test.step('Sort by name A-Z', async () => {
      await productsPage.sortBy('az');
    });

    await test.step('Verify products are sorted alphabetically', async () => {
      const names = await productsPage.productNames.allTextContents();
      const sortedNames = [...names].sort();
      expect(names).toEqual(sortedNames);
    });
  });

  test('TC-PROD-04 – Sort products by price (low to high)', async ({ productsPage }) => {
    await test.step('Sort by price low to high', async () => {
      await productsPage.sortBy('lohi');
    });

    await test.step('Verify prices are in ascending order', async () => {
      const prices = await productsPage.getProductPricesAsNumbers();
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).toEqual(sortedPrices);
    });
  });

  test('TC-PROD-05 – Open product details page', async ({ productsPage }) => {
    const productDetailsPage = await test.step('Open backpack details', async () => {
      return await productsPage.openProductDetails(PRODUCTS.backpack.name);
    });

    await test.step('Verify product name and price', async () => {
      expect(await productDetailsPage.getProductName()).toBe(PRODUCTS.backpack.name);
      expect(await productDetailsPage.getProductPrice()).toBe(PRODUCTS.backpack.price);
    });
  });

  test(
    'TC-PROD-06 – Add product to cart from products page',
    { tag: '@smoke' },
    async ({ productsPage }) => {
      await test.step('Add backpack to cart', async () => {
        await productsPage.addProductToCart(PRODUCTS.backpack.name);
      });

      await test.step('Verify cart badge shows 1', async () => {
        await expect(productsPage.cartBadge).toHaveText('1');
      });
    },
  );
});
