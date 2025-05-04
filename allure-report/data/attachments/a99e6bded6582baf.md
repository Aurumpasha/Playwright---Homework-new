# Test info

- Name: API Tests >> Login and search
- Location: C:\autoTesting\Playwright - Homework new\tests\KMS_item_search.spec.ts:10:7

# Error details

```
Error: expect(received).toHaveProperty(path)

Matcher error: received value must not be null nor undefined

Received has value: undefined
    at C:\autoTesting\Playwright - Homework new\tests\KMS_item_search.spec.ts:31:38
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
  22 |     const SearchResponse1 = await apiSearch.get(
  23 |       'https://kmsqacm.lighthouse-cloud.com/kms/lh/search/simple?query="general_auto_pa3"',
  24 |     );
  25 |
  26 |     expect(SearchResponse1.ok()).toBeTruthy();
  27 |     const sessionResponseBody = await SearchResponse1.json();
  28 |     // expect(sessionResponseBody.status).toBe('query');
  29 |
  30 |     // User data availability
> 31 |     expect(sessionResponseBody.data).toHaveProperty('query');
     |                                      ^ Error: expect(received).toHaveProperty(path)
  32 |     expect(sessionResponseBody.data).toHaveProperty('suggestedQueryAlternative');
  33 |     expect(sessionResponseBody.data).toHaveProperty('results');
  34 |     // User information
  35 |     expect(sessionResponseBody.data.userId).toBe(6);
  36 |     expect(sessionResponseBody.data.userFullName).toBe('Content Manager');
  37 |     expect(sessionResponseBody.data.username).toBe('cm');
  38 |   });
  39 | });
  40 |
```