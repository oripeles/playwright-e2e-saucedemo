import { test, expect } from '../fixtures/test-fixtures';
import { config } from '../utils/config';

test.describe('Login Tests', { tag: '@regression' }, () => {
  test('TC-LOGIN-01 – Login with valid user', { tag: '@smoke' }, async ({ loginPage, page }) => {
    await test.step('Login with standard user', async () => {
      await loginPage.login(config.users.standard, config.password);
    });

    await test.step('Verify redirect to inventory page', async () => {
      await expect(page).toHaveURL(/inventory.html/);
    });
  });

  test('TC-LOGIN-02 – Login with locked user', async ({ loginPage }) => {
    await test.step('Login with locked out user', async () => {
      await loginPage.login(config.users.locked, config.password);
    });

    await test.step('Verify locked error message', async () => {
      await expect(loginPage.errorMessage).toContainText('locked');
    });
  });

  test('TC-LOGIN-03 – Login with invalid password', async ({ loginPage }) => {
    await test.step('Login with wrong password', async () => {
      await loginPage.login(config.users.standard, 'wrong_password');
    });

    await test.step('Verify error message is visible', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
    });
  });

  test('TC-LOGIN-04 – Login with empty fields', async ({ loginPage }) => {
    await test.step('Submit login with empty fields', async () => {
      await loginPage.login('', '');
    });

    await test.step('Verify error message is visible', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
    });
  });

  test('TC-LOGIN-05 – Login with problem user', async ({ loginPage, page }) => {
    await test.step('Login with problem user', async () => {
      await loginPage.login(config.users.problem, config.password);
    });

    await test.step('Verify redirect to inventory page', async () => {
      await expect(page).toHaveURL(/inventory.html/);
    });
  });

  test('TC-LOGIN-06 – Login with performance glitch user', async ({ loginPage, page }) => {
    await test.step('Login with performance glitch user', async () => {
      await loginPage.login(config.users.performance, config.password);
    });

    await test.step('Verify redirect to inventory page', async () => {
      await expect(page).toHaveURL(/inventory.html/);
    });
  });
});
