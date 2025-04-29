import { test, expect } from '@playwright/test';
import path from 'path';
import { CREDENTIALS_CM } from '../config/credentials';
import { MAIN_ENVIRONMENT } from '../config/environment_KMS';

test('Login', async ({ page }) => {
  //Login
  await page.goto(MAIN_ENVIRONMENT.environment);
  await page.getByText('Username', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Username*' }).fill(CREDENTIALS_CM.username);
  await page.getByText('Password', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Password*' }).fill(CREDENTIALS_CM.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByTitle('Content Manager').click();
  await page.getByRole('listbox').getByRole('option', { name: 'Content Manager' }).click();
  await page.locator('#kms-login-to-layout-button').click();

  //Check susscessfull login
  await expect(page.getByRole('link', { name: 'Go to the home page' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Refresh Results' })).toBeVisible();
});
