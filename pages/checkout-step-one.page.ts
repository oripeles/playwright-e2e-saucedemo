import { Page, Locator } from '@playwright/test';
import { CheckoutOverviewPage } from './checkout-overview.page';
import { SideMenuComponent } from '../components/side-menu.component';

export class CheckoutStepOnePage {
  readonly page: Page;

  readonly title: Locator;
  readonly sideMenu: SideMenuComponent;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;

  readonly continueButton: Locator;
  readonly cancelButton: Locator;

  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sideMenu = new SideMenuComponent(page);

    this.title = page.getByTestId('title');

    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');

    this.continueButton = page.getByTestId('continue');
    this.cancelButton = page.getByTestId('cancel');

    this.errorMessage = page.getByTestId('error');
  }

  async fillCustomerInfo(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickContinue(): Promise<CheckoutOverviewPage> {
    await this.continueButton.click();
    return new CheckoutOverviewPage(this.page);
  }

  async clickCancel() {
    await this.cancelButton.click();
  }
}