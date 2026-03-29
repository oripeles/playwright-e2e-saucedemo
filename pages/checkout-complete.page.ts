import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutCompletePage extends BasePage {
  readonly title: Locator;
  readonly completeContainer: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    super(page, 'CheckoutCompletePage');

    this.title = page.getByTestId('title');
    this.completeContainer = page.getByTestId('checkout-complete-container');
    this.backToProductsButton = page.getByTestId('back-to-products');
  }

  async clickBackToProducts() {
    this.logger.info('Navigating back to products');
    await this.backToProductsButton.click();
  }
}
