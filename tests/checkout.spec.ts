import { test, expect } from '../fixtures/test-fixtures';
import { ProductsPage } from '../pages/products.page';

async function navigateToCheckout(productsPage: ProductsPage) {
  await productsPage.addProductToCart('Sauce Labs Backpack');
  const cartPage = await productsPage.openCart();
  return await cartPage.goToCheckout();
}

test.describe('Checkout Tests @regression', () => {

  test('TC-CHK-01 – Navigate to Checkout Step One from Cart', async ({ productsPage }) => {
    const checkoutStepOnePage = await navigateToCheckout(productsPage);

    await expect(checkoutStepOnePage.title).toHaveText('Checkout: Your Information');
    await expect.soft(checkoutStepOnePage.firstNameInput).toBeVisible();
    await expect.soft(checkoutStepOnePage.lastNameInput).toBeVisible();
    await expect.soft(checkoutStepOnePage.postalCodeInput).toBeVisible();
  });

  test('TC-CHK-02 – Checkout Step One – validation: all fields empty', async ({ productsPage }) => {
    const checkoutStepOnePage = await navigateToCheckout(productsPage);

    await checkoutStepOnePage.clickContinue();

    await expect(checkoutStepOnePage.errorMessage)
      .toContainText('Error: First Name is required');
  });

  test('TC-CHK-03 – Checkout Step One – validation: missing First Name', async ({ productsPage }) => {
    const checkoutStepOnePage = await navigateToCheckout(productsPage);

    await checkoutStepOnePage.fillCustomerInfo('', 'Doe', '12345');
    await checkoutStepOnePage.clickContinue();

    await expect(checkoutStepOnePage.errorMessage)
      .toContainText('Error: First Name is required');
  });

  test('TC-CHK-04 – Checkout Step One – validation: missing Last Name', async ({ productsPage }) => {
    const checkoutStepOnePage = await navigateToCheckout(productsPage);

    await checkoutStepOnePage.fillCustomerInfo('John', '', '12345');
    await checkoutStepOnePage.clickContinue();

    await expect(checkoutStepOnePage.errorMessage)
      .toContainText('Error: Last Name is required');
  });

  test('TC-CHK-05 – Checkout Step One – validation: missing Zip/Postal Code', async ({ productsPage }) => {
    const checkoutStepOnePage = await navigateToCheckout(productsPage);

    await checkoutStepOnePage.fillCustomerInfo('John', 'Doe', '');
    await checkoutStepOnePage.clickContinue();

    await expect(checkoutStepOnePage.errorMessage)
      .toContainText('Error: Postal Code is required');
  });

  test('TC-CHK-06 – Complete checkout successfully @smoke', async ({ productsPage }) => {
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');

    const cartPage = await productsPage.openCart();
    const checkoutStepOnePage = await cartPage.goToCheckout();

    await checkoutStepOnePage.fillCustomerInfo('John', 'Doe', '12345');
    const overviewPage = await checkoutStepOnePage.clickContinue();

    await expect(overviewPage.title).toHaveText('Checkout: Overview');
    await expect(overviewPage.inventoryItems).toHaveCount(2);

    const completePage = await overviewPage.clickFinish();

    await expect(completePage.title).toHaveText('Checkout: Complete!');
    await expect(completePage.completeContainer).toBeVisible();
  });

});