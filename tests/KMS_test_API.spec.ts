import { test, expect, APIRequestContext } from '@playwright/test';

test.describe('API Tests', () => {
  let apiContext: APIRequestContext;

  test.beforeEach(async ({ request }) => {
    apiContext = request;
  });
  // API login
  test('Login and get session info', async () => {
    const loginResponse = await apiContext.post(
      'https://kmsqacm.lighthouse-cloud.com/kms/lh/api/login?username=cm&password=cm',
    );
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseBody = await loginResponse.json();
    expect(loginResponseBody.status).toBe('SUCCESS');

    // Get session information
    const sessionResponse = await apiContext.get(
      'https://kmsqacm.lighthouse-cloud.com/kms/lh/api/sessionInfo',
    );

    expect(sessionResponse.ok()).toBeTruthy();
    const sessionResponseBody = await sessionResponse.json();
    expect(sessionResponseBody.status).toBe('SUCCESS');

    // User data availability
    expect(sessionResponseBody.data).toHaveProperty('userId');
    expect(sessionResponseBody.data).toHaveProperty('userFullName');
    expect(sessionResponseBody.data).toHaveProperty('username');
    // User data availability
    expect(sessionResponseBody.data.userId).toBe(6);
    expect(sessionResponseBody.data.userFullName).toBe('Content Manager');
    expect(sessionResponseBody.data.username).toBe('cm');
  });
});
