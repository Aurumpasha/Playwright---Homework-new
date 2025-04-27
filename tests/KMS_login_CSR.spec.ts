import { test, expect } from '@playwright/test';
import { CREDENTIALS_CSR } from '../credentials.ts';

test('KMS login as CSR', async ({ page }) => {
  const LoginButton = '#kms-login-to-layout-button';
  await page.goto('https://kmsqacm.lighthouse-cloud.com/kms/lh/login');
  await page.getByText('Username', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Username*' }).fill('csr');
  await page.getByText('Password', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Password*' }).fill('csr');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByTitle('CSR').click();
  await page.getByRole('listbox').getByRole('option', { name: 'CSR', exact: true }).click();
  await page.locator(LoginButton).click();
  await page.getByRole('link', { name: 'Go to the home page' }).click();
  await expect(page.getByRole('button', { name: 'Content World Menu' })).toBeVisible();
});
