# Test info

- Name: API Tests >> Login and search
- Location: C:\autoTesting\Playwright - Homework new\tests\KMS_item_search.spec.ts:11:7

# Error details

```
Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not "Offline"
    at forEach (C:\autoTesting\Playwright - Homework new\tests\KMS_item_search.spec.ts:49:35)
    at C:\autoTesting\Playwright - Homework new\tests\KMS_item_search.spec.ts:43:34
```

# Test source

```ts
   1 | import { test, expect, APIRequestContext } from '@playwright/test';
   2 | import { CREDS_API_CM } from '../config/credentials_API';
   3 |
   4 | test.describe('API Tests', () => {
   5 |   let apiSearch: APIRequestContext;
   6 |
   7 |   test.beforeEach(async ({ request }) => {
   8 |     apiSearch = request;
   9 |   });
  10 |   // API login
  11 |   test('Login and search', async () => {
  12 |     const login = await apiSearch.post(
  13 |       `https://kmsqacm.lighthouse-cloud.com/kms/lh/api/login?username=${CREDS_API_CM.username}&password=${CREDS_API_CM.password}`,
  14 |     );
  15 |
  16 |     //   'https://kmsqacm.lighthouse-cloud.com/kms/lh/api/login?username=${CREDS_API_CM.username}&password=${CREDS_API_CM.password}',
  17 |     // );
  18 |     // https://kmsqacm.lighthouse-cloud.com/kms/lh/api/login?username=cm&password=cm
  19 |     expect(login.ok()).toBeTruthy();
  20 |     const loginResponseBody = await login.json();
  21 |     expect(loginResponseBody.status).toBe('SUCCESS');
  22 |
  23 |     // Simple Search by keyword
  24 |     const SearchResponse = await apiSearch.get(
  25 |       'https://kmsqacm.lighthouse-cloud.com/kms/lh/search/simple?query=general_auto_pa',
  26 |     );
  27 |     //need double request, because single request not working
  28 |     const SearchResponse1 = await apiSearch.get(
  29 |       'https://kmsqacm.lighthouse-cloud.com/kms/lh/search/simple?query=general_auto_pa',
  30 |     );
  31 |     expect(SearchResponse1.ok()).toBeTruthy();
  32 |     const searchResponseBody = await SearchResponse1.json();
  33 |
  34 |     // Get correct array with data
  35 |     expect(searchResponseBody).toHaveProperty('query');
  36 |     expect(searchResponseBody).toHaveProperty('suggestedQueryAlternative');
  37 |
  38 |     // Check - is there are the results array
  39 |     expect(Array.isArray(searchResponseBody.results)).toBeTruthy();
  40 |
  41 |     // Check statuses of all search results
  42 |     if (searchResponseBody.results.length > 0) {
  43 |       searchResponseBody.results.forEach((result) => {
  44 |         expect(result).toHaveProperty('id');
  45 |         expect(result).toHaveProperty('title');
  46 |         expect(result).toHaveProperty('status');
  47 |
  48 |         // Item status is not "Offline" - for each item
> 49 |         expect(result.status).not.toBe('Offline');
     |                                   ^ Error: expect(received).not.toBe(expected) // Object.is equality
  50 |       });
  51 |     } else {
  52 |       throw new Error('Results array is empty');
  53 |     }
  54 |   });
  55 | });
  56 |
```