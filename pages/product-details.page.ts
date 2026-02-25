import { Page, Locator } from '@playwright/test';

export class ProductDetailsPage {
  readonly page: Page;

  readonly productName: Locator;
  readonly productPrice: Locator;
  

  constructor(page: Page) {
    this.page = page;

    this.productName = page.getByTestId('inventory-item-name');
    this.productPrice = page.getByTestId('inventory-item-price');
  }

  async getProductName(): Promise<string> {
    return (await this.productName.textContent()) ?? '';
  }

  async getProductPrice(): Promise<string> {
    return (await this.productPrice.textContent()) ?? '';
  }
}