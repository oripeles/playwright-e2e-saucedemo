import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductDetailsPage extends BasePage {
  readonly productName: Locator;
  readonly productPrice: Locator;

  constructor(page: Page) {
    super(page, 'ProductDetailsPage');

    this.productName = page.getByTestId('inventory-item-name');
    this.productPrice = page.getByTestId('inventory-item-price');
  }

  async getProductName(): Promise<string> {
    const name = (await this.productName.textContent()) ?? '';
    this.logger.info(`Product name: ${name}`);
    return name;
  }

  async getProductPrice(): Promise<string> {
    const price = (await this.productPrice.textContent()) ?? '';
    this.logger.info(`Product price: ${price}`);
    return price;
  }
}
