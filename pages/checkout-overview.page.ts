import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { CheckoutCompletePage } from './checkout-complete.page';

export class CheckoutOverviewPage extends BasePage {
  readonly title: Locator;

  readonly inventoryItems: Locator;
  readonly quantities: Locator;

  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page, 'CheckoutOverviewPage');

    this.title = page.getByTestId('title');

    this.inventoryItems = page.getByTestId('inventory-item');
    this.quantities = page.getByTestId('item-quantity');

    this.finishButton = page.getByTestId('finish');
    this.cancelButton = page.getByTestId('cancel');
  }

  async clickFinish(): Promise<CheckoutCompletePage> {
    this.logger.info('Clicking finish');
    await this.finishButton.click();
    return new CheckoutCompletePage(this.page);
  }

  async clickCancel() {
    this.logger.info('Clicking cancel');
    await this.cancelButton.click();
  }
}
