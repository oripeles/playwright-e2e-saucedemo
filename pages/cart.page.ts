import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { CheckoutStepOnePage } from './checkout-step-one.page';
import { SideMenuComponent } from '../components/side-menu.component';

export class CartPage extends BasePage {
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
    super(page, 'CartPage');
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
    this.logger.info(`Removing from cart: ${productName}`);
    await this.cartItems
      .filter({ hasText: productName })
      .getByTestId(/^remove/)
      .click();
  }

  async continueShopping(): Promise<void> {
    this.logger.info('Continue shopping');
    await this.continueShoppingButton.click();
  }

  async goToCheckout(): Promise<CheckoutStepOnePage> {
    this.logger.info('Going to checkout');
    await this.checkoutButton.click();
    return new CheckoutStepOnePage(this.page);
  }
}
