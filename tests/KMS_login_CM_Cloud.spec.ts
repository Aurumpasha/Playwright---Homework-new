import { test, expect } from '@playwright/test';
import { CREDENTIALS_CLOUD_CM } from '../config/credentials';
import { LoginPageCM_CLOUD } from '../system/LoginPage_CLOUD';

test('KMS login as Content manager on Cloud Environment', async ({ page }) => {
  const loginPageCLOUD = new LoginPageCM_CLOUD(page);
  await loginPageCLOUD.navigate();
  await loginPageCLOUD.enterUsername(CREDENTIALS_CLOUD_CM.username);
  await loginPageCLOUD.enterPassword(CREDENTIALS_CLOUD_CM.password);
  await loginPageCLOUD.clickLoginButton();
  await loginPageCLOUD.selectContentManager();
  await loginPageCLOUD.clickLoginToLayout();
  await loginPageCLOUD.verifyLoginSuccess();
});
