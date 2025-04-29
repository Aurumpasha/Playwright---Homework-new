# Test info

- Name: API Tests >> Login and search
- Location: C:\autoTesting\Playwright - Homework new\tests\KMS_item_search.spec.ts:10:7

# Error details

```
Error: expect(received).toHaveProperty(path)

Expected path: "data"
Received path: []

Received value: {"counts": {}, "itemCount": 1, "pageCount": 1, "query": "\"general_auto_pa3\"", "queryTimeInSeconds": 0.01, "results": [{"ancestorName": "EMPTY", "breadCrumbs": [], "description": "", "explainMap": null, "externalFileHighlightedContent": null, "externalFilePageCount": null, "externalFilePath": null, "externalFileType": null, "externalResource": null, "fileName": null, "highlightedFiles": null, "id": "102662", "itemDoc": [], "itemImage": null, "numOfRaters": 0, "rating": 0, "rawHits": 0, "showInSearchFields": null, "significantItemDocumentValues": null, "status": "Online", "statusCode": "2", "subType": "GENERAL", "tabs": [], "templateTitle": "General", "title": "<strong>General</strong> <strong>AUTO</strong> <strong>PA1</strong>", "updatedBy": "Content Manager", "updatedDate": "25/04/2025", "version": 1}], "similarQueries": [], "suggestedQueryAlternative": null}
    at C:\autoTesting\Playwright - Homework new\tests\KMS_item_search.spec.ts:31:32
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
  27 |     const searchResponseBody = await SearchResponse1.json();
  28 |
  29 |     // Проверяем, что получен корректный объект данных
  30 |     expect(searchResponseBody).toHaveProperty('query');
> 31 |     expect(searchResponseBody).toHaveProperty('data');
     |                                ^ Error: expect(received).toHaveProperty(path)
  32 |     expect(searchResponseBody.data).toHaveProperty('results');
  33 |
  34 |     // Проверяем, существует ли массив results
  35 |     expect(Array.isArray(searchResponseBody.data.results)).toBeTruthy();
  36 |
  37 |     if (searchResponseBody.data.results.length > 0) {
  38 |       // Проверяем свойства первого результата
  39 |       const firstResult = searchResponseBody.data.results[0];
  40 |
  41 |       expect(firstResult).toHaveProperty('id');
  42 |       expect(firstResult).toHaveProperty('title');
  43 |       expect(firstResult).toHaveProperty('status');
  44 |
  45 |       // Здесь добавьте проверку статуса
  46 |       expect(firstResult.status).toBe('Offline'); // Измените на 'Online' или 'Offline' в зависимости от вашего теста
  47 |     } else {
  48 |       throw new Error('Results array is empty');
  49 |     }
  50 |
  51 |     // User data availability
  52 |     expect(searchResponseBody.data).toHaveProperty('query');
  53 |     expect(searchResponseBody.data).toHaveProperty('suggestedQueryAlternative');
  54 |
  55 |     // expect(SearchResponse1.ok()).toBeTruthy();
  56 |     // const sessionResponseBody = await SearchResponse1.json();
  57 |
  58 |     // // Check if any item in results has status "Offline"
  59 |     // const hasOfflineStatus = sessionResponseBody.data.results.some(
  60 |     //   (item) => item.status === 'Offline',
  61 |     // );
  62 |
  63 |     // expect(hasOfflineStatus).toBeTruthy(); // Проверяем, что хотя бы один элемент имеет статус "Offline"
  64 |
  65 |     // // expect(sessionResponseBody.status).toBe('query');
  66 |
  67 |     // // User data availability
  68 |     // expect(sessionResponseBody.data).toHaveProperty('query');
  69 |     // expect(sessionResponseBody.data).toHaveProperty('suggestedQueryAlternative');
  70 |     // expect(sessionResponseBody.data).toHaveProperty('results');
  71 |     // // User information
  72 |     // expect(sessionResponseBody.data.userId).toBe(6);
  73 |     // expect(sessionResponseBody.data.userFullName).toBe('Content Manager');
  74 |     // expect(sessionResponseBody.data.username).toBe('cm');
  75 |   });
  76 | });
  77 |
```