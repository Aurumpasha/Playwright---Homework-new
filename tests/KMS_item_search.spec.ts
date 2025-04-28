import { test, expect } from '@playwright/test';
import { CREDENTIALS_CM } from '../config/credentials';
import { MAIN_ENVIRONMENT } from '../config/environment_KMS';

test('Item create', async ({ page }) => {
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
  //Item create in needed folder
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
  await page.waitForTimeout(300);
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
    .fill('General AUTO PA2');
  await page.keyboard.press('Enter');
  //Change item status to Online and save the item
  const statusSelect = page
    .locator('iframe[name="itemscope"]')
    .contentFrame()
    .locator('div')
    .filter({ hasText: /^Offline$/ })
    .first();
  await statusSelect.click();
  await statusSelect.click();
  await page.waitForTimeout(200);
  const OnlineStatus = page
    .locator('iframe[name="itemscope"]')
    .contentFrame()
    .getByRole('option', { name: 'Online' })
    .locator('span')
    .nth(1);
  await OnlineStatus.click();
  await page.locator('#kms-action-bar-button-Save').filter({ visible: true }).dblclick();
  await expect(
    page.locator('iframe[name="itemscope"]').contentFrame().locator('#item-update-status-section'),
  ).toContainText('Online');

  //item create iawait page.goto('https://kmsqacm.lighthouse-cloud.com/kms/CM/INTERNAL/LAYOUT?item_id=4&homePage=%2FCM%2FGENERAL%2FUPDATE%3Fitem_id%3D103193%26isInfo%3Dyes%26include_itm_keywords%3DY%26item_max_version%3DY%26item_revision%3D2%26item_language%3Den&homePageEncoded=true');n needed folder and save it in Offline status
  await page.getByRole('button', { name: 'Cancel' }).click();
  const itemToRightClick1 = page.locator('.tree-item-title').filter({ hasText: 'For AUTO' });
  await itemToRightClick1.click();
  await itemToRightClick1.click({ button: 'right' });
  await page.locator('.tree-item-title').filter({ hasText: 'For AUTO' }).click({ button: 'right' });
  await page.waitForTimeout(300);
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
    .fill('General AUTO PA3');
  await page.keyboard.press('Enter');
  await page.locator('#kms-action-bar-button-Save').filter({ visible: true }).dblclick();
  await expect(
    page.locator('iframe[name="itemscope"]').contentFrame().locator('#item-update-status-section'),
  ).toContainText('Offline');
});

//   await expect(
//     page.locator('iframe[name="itemscope"]').contentFrame().locator('#item-update-status-section'),
//   ).toContainText('Online');
//   await page.getByRole('button', { name: 'undefined' }).click();
//   await page.getByRole('button', { name: 'Remove' }).click();
//   await page.getByRole('button', { name: 'Yes' }).click();
