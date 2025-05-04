import { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { CLOUD_08_ENVIRONMENT } from '../config/environment_KMS';

export class LoginPageCM_CLOUD {
  private page: Page;
  private loginButtonSelector = '#kms-login-to-layout-button';

  constructor(page: Page) {
    this.page = page;
  }
  async navigate() {
    await this.page.goto(CLOUD_08_ENVIRONMENT.environment);
  }
  async enterUsername(username: string) {
    await this.page.getByText('Username', { exact: true }).click();
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
  }
  async enterPassword(password: string) {
    await this.page.getByText('Password', { exact: true }).click();
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
  }
  async clickLoginButton() {
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
  async selectContentManager() {
    await this.page.getByRole('button', { name: 'Manager' }).click();
    await this.page.getByRole('listbox').getByRole('option', { name: 'Content Manager' }).click();
  }
  async clickLoginToLayout() {
    await this.page.locator(this.loginButtonSelector).click();
  }
  async verifyLoginSuccess() {
    await expect(this.page.getByRole('banner', { name: 'Go to the home page' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Refresh Results' })).toBeVisible();
  }
}

// export class LoginPageCSR_CLOUD {
//   private page: Page;
//   private loginButtonSelector = '#kms-login-to-layout-button';

//   constructor(page: Page) {
//     this.page = page;
//   }
//   async navigate() {
//     await this.page.goto(CLOUD_08_ENVIRONMENT.environment);
//   }
//   async enterUsername(username: string) {
//     await this.page.getByText('Username', { exact: true }).click();
//     await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
//   }
//   async enterPassword(password: string) {
//     await this.page.getByText('Password', { exact: true }).click();
//     await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
//   }
//   async clickLoginButton() {
//     await this.page.getByRole('button', { name: 'Login' }).click();
//   }
//   async selectCSR() {
//     await this.page.getByTitle('CSR').click();
//     await this.page.getByRole('listbox').getByRole('option', { name: 'CSR', exact: true }).click();
//   }
//   async clickLoginToLayout() {
//     await this.page.locator(this.loginButtonSelector).click();
//   }
//   async verifyLoginSuccess() {
//     await expect(this.page.getByRole('link', { name: 'Go to the home page' })).toBeVisible();
//     await expect(this.page.getByRole('button', { name: 'Content World Menu' })).toBeVisible();
//   }
// }
