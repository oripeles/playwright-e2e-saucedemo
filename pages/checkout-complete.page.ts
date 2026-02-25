import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  

  readonly title: Locator;
  readonly completeContainer: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.getByTestId('title');
    this.completeContainer = page.getByTestId('checkout-complete-container');
    this.backToProductsButton = page.getByTestId('back-to-products');
  }

  async clickBackToProducts() {
    await this.backToProductsButton.click();
  }
}