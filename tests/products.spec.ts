import { test, expect } from '../fixtures/test-fixtures';

const PRODUCTS = {
  backpack: { name: 'Sauce Labs Backpack', price: '$29.99' },
};

test.describe('Cart Tests @regression', () => {

test('TC-PROD-01 – Products page is displayed @smoke ', async ({ productsPage }) => {
  await expect(productsPage.title).toHaveText('Products');
  const count = await productsPage.productNames.count();
  expect(count).toBeGreaterThan(0);
});

test('TC-PROD-02 – Products list contains valid product items', async ({ productsPage }) => {
  await expect.soft(productsPage.productNames.first()).toBeVisible();
  await expect.soft(productsPage.productPrices.first()).toBeVisible();
  await expect.soft(productsPage.addToCartButtons.first()).toBeVisible();
});

test('TC-PROD-03 – Sort products by name (A to Z)', async ({ productsPage }) => {
  await productsPage.sortBy('az');

  const names = await productsPage.productNames.allTextContents();
  const sortedNames = [...names].sort();

  expect(names).toEqual(sortedNames);
});

test('TC-PROD-04 – Sort products by price (low to high)', async ({ productsPage }) => {
   await productsPage.sortBy('lohi');

  const prices = await productsPage.getProductPricesAsNumbers();
  const sortedPrices = [...prices].sort((a, b) => a - b);

  expect(prices).toEqual(sortedPrices);
});

test('TC-PROD-05 – Open product details page', async ({ productsPage }) => {

  const productDetailsPage = await productsPage.openProductDetails(PRODUCTS.backpack.name);

  expect(await productDetailsPage.getProductName()).toBe(PRODUCTS.backpack.name);
  expect(await productDetailsPage.getProductPrice()).toBe(PRODUCTS.backpack.price);
});

test('TC-PROD-06 – Add product to cart from products page @smoke', async ({ productsPage }) => {

  await productsPage.addProductToCart(PRODUCTS.backpack.name);

  await expect(productsPage.cartBadge).toHaveText('1');
});
});