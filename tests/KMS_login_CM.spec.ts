import { test, expect } from '@playwright/test';
import { CREDENTIALS_CM } from '../config/credentials';
// import { MAIN_ENVIRONMENT } from '../config/environment_KMS';
import { LoginPageCM } from '../system/LoginPage_KMSQA';

// test('KMS login as Content manager', async ({ page }) => {
//   const LoginButton = '#kms-login-to-layout-button';
//   await page.goto(MAIN_ENVIRONMENT.environment);
//   await page.getByText('Username', { exact: true }).click();
//   await page.getByRole('textbox', { name: 'Username*' }).fill(CREDENTIALS_CM.username);
//   await page.getByText('Password', { exact: true }).click();
//   await page.getByRole('textbox', { name: 'Password*' }).fill(CREDENTIALS_CM.password);
//   await page.getByRole('button', { name: 'Login' }).click();
//   await page.getByTitle('Content Manager').click();
//   await page.getByRole('listbox').getByRole('option', { name: 'Content Manager' }).click();
//   await page.locator(LoginButton).click();
//   await expect(page.getByRole('link', { name: 'Go to the home page' })).toBeVisible();
//   await expect(page.getByRole('button', { name: 'Refresh Results' })).toBeVisible();
// });

test('KMS login as Content manager and Item create', async ({ page }) => {
  const loginPage = new LoginPageCM(page);
  await loginPage.navigate();
  await loginPage.enterUsername(CREDENTIALS_CM.username);
  await loginPage.enterPassword(CREDENTIALS_CM.password);
  await loginPage.clickLoginButton();
  await loginPage.selectContentManager();
  await loginPage.clickLoginToLayout();
  await loginPage.verifyLoginSuccess();
});
