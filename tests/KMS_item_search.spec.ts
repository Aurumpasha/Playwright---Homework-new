import { test, expect } from '@playwright/test';

test('Item search', async ({ page }) => {
  //KMS login as Content manager
  await page.goto('https://kmsqacm.lighthouse-cloud.com/kms/lh/login');
  await page.getByText('Username', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Username*' }).fill('cm');
  await page.getByText('Password', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Password*' }).fill('cm');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByTitle('Content Manager').click();
  await page.getByRole('listbox').getByRole('option', { name: 'Content Manager' }).click();
  await page.locator('#kms-login-to-layout-button').click();

  //Item of the "General" templte creating with Offline status

  await page.getByLabel('New Item').click();
  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search' }).fill('general');
  await page
    .getByRole('paragraph')
    .filter({ hasText: /^General$/ })
    .getByRole('img')
    .click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Skip' }).click();
  await page
    .locator('iframe[name="itemscope"]')
    .contentFrame()
    .getByRole('heading', { name: 'New Item' })
    .click();
  await page
    .locator('iframe[name="itemscope"]')
    .contentFrame()
    .locator('input[name="inplace_value"]')
    .fill('General AUTO PA1');
  await page.keyboard.press('Enter');
  // await page.locator('//*[@id="outer-layout"]/ul', { hasText: 'Save' }).click;
  // await page.locator('iframe[name="itemscope"]', { hasText: 'Save' }).click;
  await page.locator('#kms-action-bar-button-Save').filter({ visible: true }).dblclick();
  // await page.click('.custom-dropdown-toggle');

  //Set "Online" status
});

// await page.click('.custom-dropdown-toggle');
//*[@id="outer-layout"]/ul
//*[@id="kms-action-bar-button-Save"];
