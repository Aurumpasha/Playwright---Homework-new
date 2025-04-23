import { test, expect } from '@playwright/test';

test('KMS login as Content manager', async ({ page }) => {
  const LoginButton = '#kms-login-to-layout-button';
  await page.goto('https://kmsqacm.lighthouse-cloud.com/kms/lh/login');
  await page.getByText('Username', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Username*' }).fill('cm');
  await page.getByText('Password', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Password*' }).fill('cm');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByTitle('Content Manager').click();
  await page.getByRole('listbox').getByRole('option', { name: 'Content Manager' }).click();
  await page.locator(LoginButton).click();
  await expect(page.getByRole('link', { name: 'Go to the home page' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Refresh Results' })).toBeVisible();
});
