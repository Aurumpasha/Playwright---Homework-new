import { test, expect } from '@playwright/test';
import { CREDENTIALS_CM } from '../config/credentials';
import { LoginPageCM } from '../system/LoginPage_KMSQA';

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
