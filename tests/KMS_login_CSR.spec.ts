import { test, expect } from '@playwright/test';
import { CREDENTIALS_CSR } from '../config/credentials';
// import { MAIN_ENVIRONMENT } from '../config/environment_KMS';
import { LoginPageCSR } from '../system/LoginPage_KMSQA';

// test('KMS login as CSR', async ({ page }) => {
//   const LoginButton = '#kms-login-to-layout-button';
//   await page.goto(MAIN_ENVIRONMENT.environment);
//   await page.getByText('Username', { exact: true }).click();
//   await page.getByRole('textbox', { name: 'Username*' }).fill(CREDENTIALS_CSR.username);
//   await page.getByText('Password', { exact: true }).click();
//   await page.getByRole('textbox', { name: 'Password*' }).fill(CREDENTIALS_CSR.password);
//   await page.getByRole('button', { name: 'Login' }).click();
//   await page.getByTitle('CSR').click();
//   await page.getByRole('listbox').getByRole('option', { name: 'CSR', exact: true }).click();
//   await page.locator(LoginButton).click();
//   await page.getByRole('link', { name: 'Go to the home page' }).click();
//   await expect(page.getByRole('button', { name: 'Content World Menu' })).toBeVisible();
// });

test('KMS login as Content manager and Item create', async ({ page }) => {
  const loginPage = new LoginPageCSR(page);
  await loginPage.navigate();
  await loginPage.enterUsername(CREDENTIALS_CSR.username);
  await loginPage.enterPassword(CREDENTIALS_CSR.password);
  await loginPage.clickLoginButton();
  await loginPage.selectCSR();
  await loginPage.clickLoginToLayout();
  await loginPage.verifyLoginSuccess();
});
