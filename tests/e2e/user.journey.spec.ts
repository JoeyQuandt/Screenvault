import { expect, test } from '@playwright/test';

test('User can search for a movie and view details', async ({ page }) => {
  await page.goto('/');

  // 1. Find Search Input
  const searchInput = page.getByPlaceholder(
    'Search for movie & tv shows & actors',
  );
  await searchInput.fill('Dune Part Two');
  await searchInput.press('Enter');

  // 2. Wait for results
  // Ideally, wait for a specific element that appears in results
  await expect(page.locator('text=Dune: Part Two')).toBeVisible();

  // 3. Click the first resulting card
  await page.locator('text=Dune: Part Two').first().click();

  // 4. Verify URL change (Routing test)
  await expect(page).toHaveURL(/\/details\/movie\/\d+/);

  // 5. Verify Details Page Load
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Dune');
});
