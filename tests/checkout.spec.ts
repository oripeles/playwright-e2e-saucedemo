import { test, expect } from '../fixtures/test-fixtures';
import { ProductsPage } from '../pages/products.page';

const PRODUCT = 'Sauce Labs Backpack';

async function navigateToCheckout(productsPage: ProductsPage) {
  await productsPage.addProductToCart(PRODUCT);
  const cartPage = await productsPage.openCart();
  return await cartPage.goToCheckout();
}

test.describe('Checkout Tests', { tag: '@regression' }, () => {
  test('TC-CHK-01 – Navigate to Checkout Step One from Cart', async ({ productsPage }) => {
    const checkoutStepOnePage = await test.step('Navigate to checkout', async () => {
      return await navigateToCheckout(productsPage);
    });

    await test.step('Verify checkout form is displayed', async () => {
      await expect(checkoutStepOnePage.title).toHaveText('Checkout: Your Information');
      await expect.soft(checkoutStepOnePage.firstNameInput).toBeVisible();
      await expect.soft(checkoutStepOnePage.lastNameInput).toBeVisible();
      await expect.soft(checkoutStepOnePage.postalCodeInput).toBeVisible();
    });
  });

  test('TC-CHK-02 – Checkout Step One – validation: all fields empty', async ({ productsPage }) => {
    const checkoutStepOnePage = await test.step('Navigate to checkout', async () => {
      return await navigateToCheckout(productsPage);
    });

    await test.step('Submit empty form and verify error', async () => {
      await checkoutStepOnePage.clickContinue();
      await expect(checkoutStepOnePage.errorMessage).toContainText('Error: First Name is required');
    });
  });

  test('TC-CHK-03 – Checkout Step One – validation: missing First Name', async ({
    productsPage,
  }) => {
    const checkoutStepOnePage = await test.step('Navigate to checkout', async () => {
      return await navigateToCheckout(productsPage);
    });

    await test.step('Fill form without first name and verify error', async () => {
      await checkoutStepOnePage.fillCustomerInfo('', 'Doe', '12345');
      await checkoutStepOnePage.clickContinue();
      await expect(checkoutStepOnePage.errorMessage).toContainText('Error: First Name is required');
    });
  });

  test('TC-CHK-04 – Checkout Step One – validation: missing Last Name', async ({
    productsPage,
  }) => {
    const checkoutStepOnePage = await test.step('Navigate to checkout', async () => {
      return await navigateToCheckout(productsPage);
    });

    await test.step('Fill form without last name and verify error', async () => {
      await checkoutStepOnePage.fillCustomerInfo('John', '', '12345');
      await checkoutStepOnePage.clickContinue();
      await expect(checkoutStepOnePage.errorMessage).toContainText('Error: Last Name is required');
    });
  });

  test('TC-CHK-05 – Checkout Step One – validation: missing Zip/Postal Code', async ({
    productsPage,
  }) => {
    const checkoutStepOnePage = await test.step('Navigate to checkout', async () => {
      return await navigateToCheckout(productsPage);
    });

    await test.step('Fill form without postal code and verify error', async () => {
      await checkoutStepOnePage.fillCustomerInfo('John', 'Doe', '');
      await checkoutStepOnePage.clickContinue();
      await expect(checkoutStepOnePage.errorMessage).toContainText(
        'Error: Postal Code is required',
      );
    });
  });

  test(
    'TC-CHK-06 – Complete checkout successfully',
    { tag: '@smoke' },
    async ({ productsPage }) => {
      await test.step('Add products to cart', async () => {
        await productsPage.addProductToCart('Sauce Labs Backpack');
        await productsPage.addProductToCart('Sauce Labs Bike Light');
      });

      const cartPage = await test.step('Open cart', async () => {
        return await productsPage.openCart();
      });

      const overviewPage = await test.step('Fill checkout info and continue', async () => {
        const checkoutStepOnePage = await cartPage.goToCheckout();
        await checkoutStepOnePage.fillCustomerInfo('John', 'Doe', '12345');
        return await checkoutStepOnePage.clickContinue();
      });

      await test.step('Verify checkout overview', async () => {
        await expect(overviewPage.title).toHaveText('Checkout: Overview');
        await expect(overviewPage.inventoryItems).toHaveCount(2);
      });

      const completePage = await test.step('Finish order', async () => {
        return await overviewPage.clickFinish();
      });

      await test.step('Verify order complete', async () => {
        await expect(completePage.title).toHaveText('Checkout: Complete!');
        await expect(completePage.completeContainer).toBeVisible();
      });
    },
  );
});
