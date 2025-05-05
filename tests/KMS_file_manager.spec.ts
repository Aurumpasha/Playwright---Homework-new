import { test, expect } from '@playwright/test';
import path from 'path';
import { CREDENTIALS_CLOUD_CM } from '../config/credentials';
import { LoginPageCM_CLOUD } from '../system/LoginPage_CLOUD';
import { FileManager } from '../system/FileManager';

test('KMS upload the image to File manager', async ({ page }) => {
  const loginPage = new LoginPageCM_CLOUD(page);
  await loginPage.navigate();
  await loginPage.enterUsername(CREDENTIALS_CLOUD_CM.username);
  await loginPage.enterPassword(CREDENTIALS_CLOUD_CM.password);
  await loginPage.clickLoginButton();
  await loginPage.selectContentManager();
  await loginPage.clickLoginToLayout();
  await loginPage.verifyLoginSuccess();

  // Add an image to FileManager
  const fileManager = new FileManager(page);
  await fileManager.openFileManager();
  await fileManager.navigateToExternalFiles();

  // Set the path to needed file (from this project)
  const filePath = path.join(__dirname, '../images/cat4.jpg');
  await fileManager.uploadFile(filePath);

  //item create in needed folder and save it in Offline status
  await page.getByRole('link').filter({ hasText: /^$/ }).first().click();
  await page.waitForTimeout(1000);
  const itemToRightClick1 = page.locator('.tree-item-title').filter({ hasText: 'Folder 5' });
  await itemToRightClick1.click();
  await itemToRightClick1.click({ button: 'right' });
  await page.locator('.tree-item-title').filter({ hasText: 'Folder 5' }).click({ button: 'right' });
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
  await page.getByRole('button', { name: 'Create item' }).click();
  await page.waitForTimeout(3000);
  await page
    .locator('iframe[name="itemscope"]')
    .contentFrame()
    .getByRole('heading', { name: 'New Item' })
    .click();
  await page
    .locator('iframe[name="itemscope"]')
    .contentFrame()
    .locator('input[name="inplace_value"]')
    .fill('General AUTO PA4');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(300);
  await page.locator('#kms-action-bar-button-Save').filter({ visible: true }).dblclick();
  await expect(
    page.locator('iframe[name="itemscope"]').contentFrame().locator('#item-update-status-section'),
  ).toContainText('Offline');
  await page.waitForTimeout(300);
  await page.getByRole('button', { name: 'Cancel' }).click();

  // Go to "General" tab and add a picture to "File (external)" field
  await page
    .locator('iframe[name="itemscope"]')
    .contentFrame()
    .getByRole('link', { name: 'General' })
    .click();
  await page
    .locator('iframe[name="itemscope"]')
    .contentFrame()
    .locator('#item-update-tab-1 div')
    .filter({ hasText: 'File (external): View mode:' })
    .getByRole('button')
    .click();
  await page.getByRole('link', { name: 'cat4.jpg' }).click();
  await page.getByRole('button', { name: 'Select file' }).click();
  await page.waitForTimeout(300);
  await page.locator('#kms-action-bar-button-Save').filter({ visible: true }).dblclick();
  await page.waitForTimeout(300);
  await page.getByRole('button', { name: 'Cancel' }).click();

  // Check if image is uploaded
  await expect(
    page
      .locator('iframe[name="itemscope"]')
      .contentFrame()
      .getByRole('img', { name: 'Click to enlarge' }),
  ).toBeVisible();
});
