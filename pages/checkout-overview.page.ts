import { Page, Locator } from '@playwright/test';
import { CheckoutCompletePage } from './checkout-complete.page';

export class CheckoutOverviewPage {
  readonly page: Page;

  readonly title: Locator;
  

  readonly inventoryItems: Locator;
  readonly quantities: Locator;

  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.getByTestId('title');

    this.inventoryItems = page.getByTestId('inventory-item');
    this.quantities = page.getByTestId('item-quantity');

    this.finishButton = page.getByTestId('finish');
    this.cancelButton = page.getByTestId('cancel');
  }

  async clickFinish(): Promise<CheckoutCompletePage> {
    await this.finishButton.click();
    return new CheckoutCompletePage(this.page);
  }

  async clickCancel() {
    await this.cancelButton.click();
  }
}