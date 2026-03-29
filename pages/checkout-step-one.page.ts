import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { CheckoutOverviewPage } from './checkout-overview.page';
import { SideMenuComponent } from '../components/side-menu.component';

export class CheckoutStepOnePage extends BasePage {
  readonly title: Locator;
  readonly sideMenu: SideMenuComponent;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;

  readonly continueButton: Locator;
  readonly cancelButton: Locator;

  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page, 'CheckoutStepOnePage');
    this.sideMenu = new SideMenuComponent(page);

    this.title = page.getByTestId('title');

    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');

    this.continueButton = page.getByTestId('continue');
    this.cancelButton = page.getByTestId('cancel');

    this.errorMessage = page.getByTestId('error');
  }

  async fillCustomerInfo(firstName: string, lastName: string, postalCode: string) {
    this.logger.info(`Filling customer info: ${firstName} ${lastName}`);
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickContinue(): Promise<CheckoutOverviewPage> {
    this.logger.info('Clicking continue');
    await this.continueButton.click();
    return new CheckoutOverviewPage(this.page);
  }

  async clickCancel() {
    this.logger.info('Clicking cancel');
    await this.cancelButton.click();
  }
}
