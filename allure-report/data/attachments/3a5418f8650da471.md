# Test info

- Name: API Tests >> Login and search
- Location: C:\autoTesting\Playwright - Homework new\tests\KMS_item_search.spec.ts:10:7

# Error details

```
Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not "Offline"
    at forEach (C:\autoTesting\Playwright - Homework new\tests\KMS_item_search.spec.ts:44:35)
    at C:\autoTesting\Playwright - Homework new\tests\KMS_item_search.spec.ts:38:34
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
  20 |       'https://kmsqacm.lighthouse-cloud.com/kms/lh/search/simple?query=general_auto_pa',
  21 |     );
  22 |     //need double request, because single request not working
  23 |     const SearchResponse1 = await apiSearch.get(
  24 |       'https://kmsqacm.lighthouse-cloud.com/kms/lh/search/simple?query=general_auto_pa',
  25 |     );
  26 |     expect(SearchResponse1.ok()).toBeTruthy();
  27 |     const searchResponseBody = await SearchResponse1.json();
  28 |
  29 |     // Get correct array with data
  30 |     expect(searchResponseBody).toHaveProperty('query');
  31 |     expect(searchResponseBody).toHaveProperty('suggestedQueryAlternative');
  32 |
  33 |     // Check - is there are the results array
  34 |     expect(Array.isArray(searchResponseBody.results)).toBeTruthy();
  35 |
  36 |     // Check statuses of all search results
  37 |     if (searchResponseBody.results.length > 0) {
  38 |       searchResponseBody.results.forEach((result) => {
  39 |         expect(result).toHaveProperty('id');
  40 |         expect(result).toHaveProperty('title');
  41 |         expect(result).toHaveProperty('status');
  42 |
  43 |         // Item status is not "Offline" - for each item
> 44 |         expect(result.status).not.toBe('Offline');
     |                                   ^ Error: expect(received).not.toBe(expected) // Object.is equality
  45 |       });
  46 |     } else {
  47 |       throw new Error('Results array is empty');
  48 |     }
  49 |   });
  50 | });
  51 |
```