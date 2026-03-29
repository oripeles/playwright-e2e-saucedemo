import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { ProductsPage } from './products.page';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly loginLogo: Locator;

  constructor(page: Page) {
    super(page, 'LoginPage');

    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');
    this.loginLogo = page.getByText('Swag Labs');
  }

  async open() {
    this.logger.info('Opening login page');
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    this.logger.info(`Logging in as ${username}`);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    return new ProductsPage(this.page);
  }
}
