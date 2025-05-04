# Test info

- Name: API Tests >> Login and search
- Location: C:\autoTesting\Playwright - Homework new\tests\KMS_item_search.spec.ts:10:7

# Error details

```
SyntaxError: Unexpected token '<', "

<!DOCTYPE "... is not valid JSON
    at C:\autoTesting\Playwright - Homework new\tests\KMS_item_search.spec.ts:24:33
```

# Test source

```ts
   1 | import { test, expect, APIRequestContext } from '@playwright/test';
   2 |
   3 | test.describe('API Tests', () => {
   4 |   let apiSearch: APIRequestContext;
   5 |
   6 |   test.beforeEach(async ({ request }) => {
   7 |     apiSearch = request;
   8 |   });
   9 |   // API login
  10 |   test('Login and search', async () => {
  11 |     const login = await apiSearch.post(
  12 |       'https://kmsqacm.lighthouse-cloud.com/kms/lh/api/login?username=cm&password=cm',
  13 |     );
  14 |     expect(login.ok()).toBeTruthy();
  15 |     const loginResponseBody = await login.json();
  16 |     expect(loginResponseBody.status).toBe('SUCCESS');
  17 |
  18 |     // Simple Search by keyword
  19 |     const SearchResponse = await apiSearch.get(
  20 |       'https://kmsqacm.lighthouse-cloud.com/kms/lh/search/simple?query="general_auto_pa3"',
  21 |     );
  22 |
  23 |     expect(SearchResponse.ok()).toBeTruthy();
> 24 |     const sessionResponseBody = await SearchResponse.json();
     |                                 ^ SyntaxError: Unexpected token '<', "
  25 |     expect(sessionResponseBody.status).toBe('SUCCESS');
  26 |
  27 |     // User data availability
  28 |     expect(sessionResponseBody.data).toHaveProperty('userId');
  29 |     expect(sessionResponseBody.data).toHaveProperty('userFullName');
  30 |     expect(sessionResponseBody.data).toHaveProperty('username');
  31 |     // User information
  32 |     expect(sessionResponseBody.data.userId).toBe(6);
  33 |     expect(sessionResponseBody.data.userFullName).toBe('Content Manager');
  34 |     expect(sessionResponseBody.data.username).toBe('cm');
  35 |   });
  36 | });
  37 |
```