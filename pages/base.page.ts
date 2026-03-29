import { Page } from '@playwright/test';
import { Logger } from '../utils/logger';

export abstract class BasePage {
  readonly page: Page;
  protected logger: Logger;

  constructor(page: Page, name: string) {
    this.page = page;
    this.logger = new Logger(name);
  }
}
