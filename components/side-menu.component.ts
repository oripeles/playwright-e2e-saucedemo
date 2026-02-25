import { Page, Locator } from '@playwright/test';

export class SideMenuComponent {
  readonly page: Page;

  readonly menuButton: Locator;
  readonly closeButton: Locator;

  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.menuButton = page.locator('#react-burger-menu-btn');
    this.closeButton = page.getByRole('button', { name: 'Close Menu' });

    this.allItemsLink = page.getByTestId('inventory-sidebar-link');
    this.aboutLink  = page.getByTestId('about-sidebar-link');
    this.logoutLink = page.getByTestId('logout-sidebar-link');
    this.resetLink  = page.getByTestId('reset-sidebar-link');
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async closeMenu() {
    await this.closeButton.click();
  }

  async logout() {
  await this.openMenu();
  await this.logoutLink.click();
}

async resetAppState() {
  await this.openMenu();
  await this.resetLink.click();
}

  
}