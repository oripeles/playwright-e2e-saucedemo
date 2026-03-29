import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/logger';

export class SideMenuComponent {
  readonly page: Page;
  private logger: Logger;

  readonly menuButton: Locator;
  readonly closeButton: Locator;

  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logger = new Logger('SideMenuComponent');

    this.menuButton = page.locator('#react-burger-menu-btn');
    this.closeButton = page.getByRole('button', { name: 'Close Menu' });

    this.allItemsLink = page.getByTestId('inventory-sidebar-link');
    this.aboutLink = page.getByTestId('about-sidebar-link');
    this.logoutLink = page.getByTestId('logout-sidebar-link');
    this.resetLink = page.getByTestId('reset-sidebar-link');
  }

  async openMenu() {
    this.logger.info('Opening side menu');
    await this.menuButton.click();
  }

  async closeMenu() {
    this.logger.info('Closing side menu');
    await this.closeButton.click();
  }

  async logout() {
    this.logger.info('Logging out');
    await this.openMenu();
    await this.logoutLink.click();
  }

  async resetAppState() {
    this.logger.info('Resetting app state');
    await this.openMenu();
    await this.resetLink.click();
  }
}
