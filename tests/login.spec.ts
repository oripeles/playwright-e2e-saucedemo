import { test, expect } from '../fixtures/test-fixtures';
import { config } from '../utils/config';

test.describe('Login Tests @regression', () => {

  test('TC-LOGIN-01 – Login with valid user @smoke', async ({ loginPage, page }) => {
    await loginPage.login(config.users.standard, config.password);

    await expect(page).toHaveURL(/inventory.html/);
  });

  test('TC-LOGIN-02 – Login with locked user', async ({ loginPage }) => {
    await loginPage.login(config.users.locked, config.password);

    await expect(loginPage.errorMessage).toContainText('locked');
  });

  test('TC-LOGIN-03 – Login with invalid password', async ({ loginPage }) => {
    await loginPage.login(config.users.standard, 'wrong_password');

    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('TC-LOGIN-04 – Login with empty fields', async ({ loginPage }) => {
    await loginPage.login('', '');

    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('TC-LOGIN-05 – Login with problem user', async ({ loginPage, page }) => {
    await loginPage.login(config.users.problem, config.password);

    await expect(page).toHaveURL(/inventory.html/);
  });

  test('TC-LOGIN-06 – Login with performance glitch user', async ({ loginPage, page }) => {
    await loginPage.login(config.users.performance, config.password);

    await expect(page).toHaveURL(/inventory.html/);
  });

});