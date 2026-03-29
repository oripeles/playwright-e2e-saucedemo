import { test, expect } from '../fixtures/test-fixtures';

const PRODUCT_1 = 'Sauce Labs Backpack';

test.describe('Logout & Navigation Tests', { tag: '@regression' }, () => {
  test('TC-NAV-01 – Open and close side menu', async ({ productsPage }) => {
    await test.step('Open side menu', async () => {
      await productsPage.sideMenu.openMenu();
    });

    await test.step('Verify all menu links are visible', async () => {
      await expect.soft(productsPage.sideMenu.allItemsLink).toBeVisible();
      await expect.soft(productsPage.sideMenu.aboutLink).toBeVisible();
      await expect.soft(productsPage.sideMenu.logoutLink).toBeVisible();
      await expect.soft(productsPage.sideMenu.resetLink).toBeVisible();
    });

    await test.step('Close side menu', async () => {
      await productsPage.sideMenu.closeMenu();
    });

    await test.step('Verify menu is closed', async () => {
      await expect(productsPage.sideMenu.closeButton).toBeHidden();
      await expect(productsPage.title).toHaveText('Products');
    });
  });

  test(
    'TC-NAV-02 – Logout redirects user to Login page',
    { tag: '@smoke' },
    async ({ productsPage }) => {
      await test.step('Logout', async () => {
        await productsPage.sideMenu.logout();
      });

      await test.step('Verify redirected to login page', async () => {
        await expect(productsPage.page).toHaveURL('/');
        await expect(productsPage.page.getByTestId('username')).toBeVisible();
        await expect(productsPage.page.getByTestId('password')).toBeVisible();
        await expect(productsPage.page.getByTestId('login-button')).toBeVisible();
      });
    },
  );

  test('TC-NAV-03 – Cannot access Products page after logout', async ({ productsPage }) => {
    await test.step('Logout', async () => {
      await productsPage.sideMenu.logout();
    });

    await test.step('Try to access inventory page directly', async () => {
      await productsPage.page.goto('/inventory.html');
    });

    await test.step('Verify redirected to login', async () => {
      await expect(productsPage.page).toHaveURL('/');
      await expect(productsPage.page.getByTestId('login-button')).toBeVisible();
    });
  });

  test('TC-NAV-04 – Direct navigation to protected URL without login', async ({ productsPage }) => {
    await test.step('Logout', async () => {
      await productsPage.sideMenu.logout();
    });

    await test.step('Try to access cart page directly', async () => {
      await productsPage.page.goto('/cart.html');
      await expect(productsPage.page).toHaveURL('/');
      await expect(productsPage.page.getByTestId('login-button')).toBeVisible();
    });

    await test.step('Try to access checkout page directly', async () => {
      await productsPage.page.goto('/checkout-step-one.html');
      await expect(productsPage.page).toHaveURL('/');
      await expect(productsPage.page.getByTestId('login-button')).toBeVisible();
    });
  });

  test('TC-NAV-05 – Cart icon navigates correctly', async ({ productsPage }) => {
    await test.step('Click cart icon', async () => {
      await productsPage.cartIcon.click();
    });

    await test.step('Verify on cart page', async () => {
      await expect(productsPage.page).toHaveURL(/cart\.html/);
      await expect(productsPage.page.getByTestId('title')).toHaveText('Your Cart');
    });
  });

  test('TC-NAV-06 – Reset App State clears cart and restores product button state', async ({
    productsPage,
  }) => {
    await test.step('Add product to cart', async () => {
      await productsPage.addProductToCart(PRODUCT_1);
      await expect(productsPage.cartBadge).toHaveText('1');
    });

    await test.step('Reset app state', async () => {
      await productsPage.sideMenu.resetAppState();
    });

    await test.step('Verify cart badge is cleared', async () => {
      await expect(productsPage.cartBadge).toHaveCount(0);
    });

    await test.step('Verify cart is empty', async () => {
      await productsPage.cartIcon.click();
      await expect(productsPage.page.getByTestId('inventory-item')).toHaveCount(0);
    });

    await test.step('Verify add-to-cart button is restored', async () => {
      await productsPage.page.goto('/inventory.html');
      const item = productsPage.inventoryItems.filter({ hasText: PRODUCT_1 });
      await expect(item.getByTestId(/^add-to-cart/)).toBeVisible();
      await expect(item.getByTestId(/^remove/)).toHaveCount(0);
    });
  });
});
