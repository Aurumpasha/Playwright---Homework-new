import { test, expect, APIRequestContext } from '@playwright/test';

test.describe('API Tests', () => {
  let apiSearch: APIRequestContext;

  test.beforeEach(async ({ request }) => {
    apiSearch = request;
  });
  // API login
  test('Login and search', async () => {
    const login = await apiSearch.post(
      'https://kmsqacm.lighthouse-cloud.com/kms/lh/api/login?username=csr&password=csr',
    );
    expect(login.ok()).toBeTruthy();
    const loginResponseBody = await login.json();
    expect(loginResponseBody.status).toBe('SUCCESS');

    // Simple Search by keyword
    const SearchResponse = await apiSearch.get(
      'https://kmsqacm.lighthouse-cloud.com/kms/lh/search/simple?query=general_auto_pa',
    );
    //need double request, because single request not working
    const SearchResponse1 = await apiSearch.get(
      'https://kmsqacm.lighthouse-cloud.com/kms/lh/search/simple?query=general_auto_pa',
    );
    expect(SearchResponse1.ok()).toBeTruthy();
    const searchResponseBody = await SearchResponse1.json();

    // Get correct array with data
    expect(searchResponseBody).toHaveProperty('query');
    expect(searchResponseBody).toHaveProperty('suggestedQueryAlternative');

    // Check - is there are the results array
    expect(Array.isArray(searchResponseBody.results)).toBeTruthy();

    // Check statuses of all search results
    if (searchResponseBody.results.length > 0) {
      searchResponseBody.results.forEach((result) => {
        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('title');
        expect(result).toHaveProperty('status');

        // Item status is not "Offline" - for each item
        expect(result.status).not.toBe('Offline');
      });
    } else {
      throw new Error('Results array is empty');
    }
  });
});
