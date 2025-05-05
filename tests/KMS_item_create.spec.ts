import { test, expect } from '@playwright/test';
import { CREDENTIALS_CM } from '../config/credentials';
// import { MAIN_ENVIRONMENT } from '../config/environment_KMS';
import { LoginPageCM } from '../system/LoginPage_KMSQA';

// //Login
// await page.goto(MAIN_ENVIRONMENT.environment);
// await page.getByText('Username', { exact: true }).click();
// await page.getByRole('textbox', { name: 'Username*' }).fill(CREDENTIALS_CM.username);
// await page.getByText('Password', { exact: true }).click();
// await page.getByRole('textbox', { name: 'Password*' }).fill(CREDENTIALS_CM.password);
// await page.getByRole('button', { name: 'Login' }).click();
// await page.getByTitle('Content Manager').click();
// await page.getByRole('listbox').getByRole('option', { name: 'Content Manager' }).click();
// await page.locator('#kms-login-to-layout-button').click();

// //Check susscessfull login
// await expect(page.getByRole('link', { name: 'Go to the home page' })).toBeVisible();
// await expect(page.getByRole('button', { name: 'Refresh Results' })).toBeVisible();

// Login and Check susscessfull login
test('KMS login as Content manager and Item create', async ({ page }) => {
  const loginPage = new LoginPageCM(page);
  await loginPage.navigate();
  await loginPage.enterUsername(CREDENTIALS_CM.username);
  await loginPage.enterPassword(CREDENTIALS_CM.password);
  await loginPage.clickLoginButton();
  await loginPage.selectContentManager();
  await loginPage.clickLoginToLayout();
  await loginPage.verifyLoginSuccess();

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
  await page.waitForTimeout(500);
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

  //Check color of the item in "Online" status
  const buttonElementOnline = await page
    .locator('.cmTreeOnlineStatus button')
    .filter({ hasText: 'General AUTO PA2' });
  const colorOnline = await buttonElementOnline.evaluate((element) => {
    return window.getComputedStyle(element).color;
  });
  const rgbToHexOnline = (rgb: string) => {
    const rgbValues = rgb.match(/\d+/g);
    if (!rgbValues) return '';
    const hex = rgbValues
      .map((value) => {
        const hexValue = parseInt(value).toString(16);
        return hexValue.length === 1 ? '0' + hexValue : hexValue;
      })
      .join('');
    return `#${hex}`;
  };
  const hexColorOnline = rgbToHexOnline(colorOnline);
  expect(hexColorOnline).toBe('#0a0c0d');

  //item create in needed folder and save it in Offline status
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
  await page.waitForTimeout(300);
  await page.locator('#kms-action-bar-button-Save').filter({ visible: true }).dblclick();
  await expect(
    page.locator('iframe[name="itemscope"]').contentFrame().locator('#item-update-status-section'),
  ).toContainText('Offline');
  await page.getByRole('button', { name: 'Cancel' }).click();

  //Check color of the item in "Offline" status
  const buttonElementOffline = await page
    .locator('.cmTreeOfflineStatus button')
    .filter({ hasText: 'General AUTO PA3' });
  const colorOffline = await buttonElementOffline.evaluate((element) => {
    return window.getComputedStyle(element).color;
  });
  const rgbToHexOffline = (rgb: string) => {
    const rgbValues = rgb.match(/\d+/g);
    if (!rgbValues) return '';
    const hex = rgbValues
      .map((value) => {
        const hexValue = parseInt(value).toString(16);
        return hexValue.length === 1 ? '0' + hexValue : hexValue;
      })
      .join('');
    return `#${hex}`;
  };
  const hexColorOffline = rgbToHexOffline(colorOffline);
  expect(hexColorOffline).toBe('#ff0000');
});

//   await page.getByRole('button', { name: 'undefined' }).click();
//   await page.getByRole('button', { name: 'Remove' }).click();
//   await page.getByRole('button', { name: 'Yes' }).click();
