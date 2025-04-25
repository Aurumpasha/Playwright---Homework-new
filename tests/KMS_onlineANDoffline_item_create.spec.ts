import { test, expect } from '@playwright/test';

test('Item create', async ({ page }) => {
  await page.goto('https://kmsqacm.lighthouse-cloud.com/kms/lh/login');
  await page.getByText('Username', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Username*' }).fill('cm');
  await page.getByText('Password', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Password*' }).fill('cm');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByTitle('Content Manager').click();
  await page.getByRole('listbox').getByRole('option', { name: 'Content Manager' }).click();
  await page.locator('#kms-login-to-layout-button').click();
  await page.locator('span').filter({ hasText: 'Charoite' }).getByLabel('Expand Folder').click();
  await page
    .locator('span')
    .filter({ hasText: 'Pavel`s items' })
    .getByLabel('Expand Folder')
    .click();

  const itemToRightClick = page.locator('.tree-item-title').filter({ hasText: 'For AUTO' });
  await itemToRightClick.click();
  await itemToRightClick.click({ button: 'right' });
  await page.locator('.tree-item-title').filter({ hasText: 'For AUTO' }).click({ button: 'right' });
  await page.waitForTimeout(100);
  await page.keyboard.press('N');
  await page.waitForTimeout(1000);
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
  const statusSelect = page
    .locator('iframe[name="itemscope"]')
    .contentFrame()
    .locator('div')
    .filter({ hasText: /^Offline$/ })
    .first();
  await statusSelect.click();
  await statusSelect.click();
  await page.waitForTimeout(100);
  //   const OnlineStatus = page.locator('.item-label').filter({ hasText: 'Online' });
  const OnlineStatus = page
    .locator('iframe[name="itemscope"]')
    .contentFrame()
    .getByRole('option', { name: 'Online' })
    .locator('span')
    .nth(1);
  await OnlineStatus.click();
  await page.locator('#kms-action-bar-button-Save').filter({ visible: true }).dblclick();
});

//   await expect(
//     page.locator('iframe[name="itemscope"]').contentFrame().locator('#item-update-status-section'),
//   ).toContainText('Online');
//   await page.getByRole('button', { name: 'undefined' }).click();
//   await page.getByRole('button', { name: 'Remove' }).click();
//   await page.getByRole('button', { name: 'Yes' }).click();
