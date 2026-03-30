import { test, expect } from '../fixtures/test-fixtures';

test.describe('Security-Aware Tests', { tag: '@regression' }, () => {
  test('TC-SEC-01 – SQL injection in login form', async ({ loginPage }) => {
    await test.step('Attempt SQL injection in username', async () => {
      await loginPage.login("' OR 1=1 --", 'password');
    });

    await test.step('Verify login is blocked with standard error', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).not.toContainText('SQL');
      await expect(loginPage.errorMessage).not.toContainText('syntax');
      await expect(loginPage.errorMessage).not.toContainText('query');
    });
  });

  test('TC-SEC-02 – XSS injection in login form', async ({ loginPage }) => {
    let dialogTriggered = false;
    loginPage.page.on('dialog', () => {
      dialogTriggered = true;
    });

    await test.step('Attempt XSS injection in username', async () => {
      await loginPage.login('<script>alert("xss")</script>', 'password');
    });

    await test.step('Verify no script execution and login is blocked', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      expect(dialogTriggered).toBe(false);
    });
  });

  test('TC-SEC-03 – Password field is masked', async ({ loginPage }) => {
    await test.step('Verify password input type is "password"', async () => {
      await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
    });
  });

  test('TC-SEC-04 – Error message does not expose system info', async ({ loginPage }) => {
    await test.step('Login with invalid credentials', async () => {
      await loginPage.login('invalid_user', 'invalid_pass');
    });

    await test.step('Verify error message is generic and safe', async () => {
      const errorText = await loginPage.errorMessage.textContent();
      expect(errorText).not.toMatch(/stack|trace|exception|database|server|500/i);
    });
  });

  test('TC-SEC-05 – HTML injection in checkout form', async ({ productsPage }) => {
    let dialogTriggered = false;
    productsPage.page.on('dialog', () => {
      dialogTriggered = true;
    });

    const checkoutPage = await test.step('Navigate to checkout', async () => {
      await productsPage.addProductToCart('Sauce Labs Backpack');
      const cartPage = await productsPage.openCart();
      return await cartPage.goToCheckout();
    });

    await test.step('Inject HTML/script tags in form fields', async () => {
      await checkoutPage.fillCustomerInfo(
        '<img src=x onerror=alert(1)>',
        '<script>alert("xss")</script>',
        '"><img src=x onerror=alert(1)>',
      );
      await checkoutPage.clickContinue();
    });

    await test.step('Verify app does not break or execute scripts', async () => {
      expect(dialogTriggered).toBe(false);
      await expect(productsPage.page.locator('img[src="x"]')).toHaveCount(0);
    });
  });
});
