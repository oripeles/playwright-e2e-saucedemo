import { Page, Locator } from '@playwright/test';
import { ProductDetailsPage } from './product-details.page';
import { CartPage } from './cart.page';
import { SideMenuComponent } from '../components/side-menu.component';

export class ProductsPage {
  readonly page: Page;
  readonly inventoryItems: Locator; 
  readonly title: Locator;
  readonly sortDropdown: Locator;
  readonly sideMenu: SideMenuComponent;

  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly addToCartButtons: Locator;
  
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sideMenu = new SideMenuComponent(page);

    this.title = page.getByTestId('title');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.inventoryItems = page.getByTestId('inventory-item');

    this.productNames = page.getByTestId('inventory-item-name');
    this.productPrices = page.getByTestId('inventory-item-price');
    
    this.addToCartButtons = page.getByTestId(/^add-to-cart/);

    this.cartIcon = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(value);
  }

  async openProductDetails(productName: string): Promise<ProductDetailsPage> {
    await this.inventoryItems
      .filter({ hasText: productName })
      .getByTestId('inventory-item-name')
      .click();

    return new ProductDetailsPage(this.page);
  }
  async getProductPricesAsNumbers(): Promise<number[]> {
    const pricesText = await this.productPrices.allTextContents();
    return pricesText.map(p => Number(p.replace('$', '')));
  }

  async addProductToCart(productName: string) {
    await this.inventoryItems
      .filter({ hasText: productName })
      .getByTestId(/^add-to-cart/)
      .click();
  }

async openCart(): Promise<CartPage> {
  await this.cartIcon.click();
  return new CartPage(this.page);
}

}

