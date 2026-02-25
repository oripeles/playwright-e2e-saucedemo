import { test, expect } from '../fixtures/test-fixtures';

test('TC-VISUAL-01 – Products page visual regression', async ({ productsPage }) => {
  await expect(productsPage.page).toHaveScreenshot('products-page.png');
});