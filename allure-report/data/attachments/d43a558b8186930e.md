# Test info

- Name: API Tests >> Login and search
- Location: C:\autoTesting\Playwright - Homework new\tests\KMS_item_search.spec.ts:10:7

# Error details

```
Error: expect(received).toHaveProperty(path)

Expected path: "data"
Received path: []

Received value: {"counts": {}, "itemCount": 1, "pageCount": 1, "query": "\"general_auto_pa3\"", "queryTimeInSeconds": 0.01, "results": [{"ancestorName": "EMPTY", "breadCrumbs": [], "description": "", "explainMap": null, "externalFileHighlightedContent": null, "externalFilePageCount": null, "externalFilePath": null, "externalFileType": null, "externalResource": null, "fileName": null, "highlightedFiles": null, "id": "102662", "itemDoc": [], "itemImage": null, "numOfRaters": 0, "rating": 0, "rawHits": 0, "showInSearchFields": null, "significantItemDocumentValues": null, "status": "Online", "statusCode": "2", "subType": "GENERAL", "tabs": [], "templateTitle": "General", "title": "<strong>General</strong> <strong>AUTO</strong> <strong>PA1</strong>", "updatedBy": "Content Manager", "updatedDate": "25/04/2025", "version": 1}], "similarQueries": [], "suggestedQueryAlternative": null}
    at C:\autoTesting\Playwright - Homework new\tests\KMS_item_search.spec.ts:30:32
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
> 30 |     expect(searchResponseBody).toHaveProperty('data');
     |                                ^ Error: expect(received).toHaveProperty(path)
  31 |     expect(searchResponseBody.data).toHaveProperty('results');
  32 |
  33 |     // Проверяем, существует ли массив results
  34 |     expect(Array.isArray(searchResponseBody.data.results)).toBeTruthy();
  35 |
  36 |     if (searchResponseBody.data.results.length > 0) {
  37 |       // Проверяем свойства первого результата
  38 |       const firstResult = searchResponseBody.data.results[0];
  39 |
  40 |       expect(firstResult).toHaveProperty('id');
  41 |       expect(firstResult).toHaveProperty('title');
  42 |       expect(firstResult).toHaveProperty('status');
  43 |
  44 |       // Здесь добавьте проверку статуса
  45 |       expect(firstResult.status).toBe('Offline'); // Измените на 'Online' или 'Offline' в зависимости от вашего теста
  46 |     } else {
  47 |       throw new Error('Results array is empty');
  48 |     }
  49 |
  50 |     // User data availability
  51 |     expect(searchResponseBody.data).toHaveProperty('query');
  52 |     expect(searchResponseBody.data).toHaveProperty('suggestedQueryAlternative');
  53 |
  54 |     // expect(SearchResponse1.ok()).toBeTruthy();
  55 |     // const sessionResponseBody = await SearchResponse1.json();
  56 |
  57 |     // // Check if any item in results has status "Offline"
  58 |     // const hasOfflineStatus = sessionResponseBody.data.results.some(
  59 |     //   (item) => item.status === 'Offline',
  60 |     // );
  61 |
  62 |     // expect(hasOfflineStatus).toBeTruthy(); // Проверяем, что хотя бы один элемент имеет статус "Offline"
  63 |
  64 |     // // expect(sessionResponseBody.status).toBe('query');
  65 |
  66 |     // // User data availability
  67 |     // expect(sessionResponseBody.data).toHaveProperty('query');
  68 |     // expect(sessionResponseBody.data).toHaveProperty('suggestedQueryAlternative');
  69 |     // expect(sessionResponseBody.data).toHaveProperty('results');
  70 |     // // User information
  71 |     // expect(sessionResponseBody.data.userId).toBe(6);
  72 |     // expect(sessionResponseBody.data.userFullName).toBe('Content Manager');
  73 |     // expect(sessionResponseBody.data.username).toBe('cm');
  74 |   });
  75 | });
  76 |
```