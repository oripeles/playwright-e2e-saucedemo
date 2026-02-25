import { Page, Locator } from '@playwright/test';
import { CheckoutStepOnePage } from './checkout-step-one.page';
import { SideMenuComponent } from '../components/side-menu.component';

export class CartPage {
  readonly page: Page;
  readonly sideMenu: SideMenuComponent;

  readonly title: Locator;
  readonly cartItems: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly quantities: Locator;

  readonly cartBadge: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sideMenu = new SideMenuComponent(page);
    

    this.title = page.getByTestId('title');

    this.cartItems = page.getByTestId('inventory-item');
    this.quantities = page.getByTestId('item-quantity');

    this.productNames = page.getByTestId('inventory-item-name');
    this.productPrices = page.getByTestId('inventory-item-price');

    this.cartBadge = page.getByTestId('shopping-cart-badge');

    this.continueShoppingButton = page.getByTestId('continue-shopping');
    this.checkoutButton = page.getByTestId('checkout');
  }

  async removeProductByName(productName: string) {
    await this.cartItems
      .filter({ hasText: productName })
      .getByTestId(/^remove/)
      .click();
  }

  async continueShopping(): Promise<void> {
  await this.continueShoppingButton.click();
}

async clickCheckout(): Promise<void> {
  await this.checkoutButton.click();
}

async goToCheckout(): Promise<CheckoutStepOnePage> {
  await this.checkoutButton.click();
  return new CheckoutStepOnePage(this.page);
}
}