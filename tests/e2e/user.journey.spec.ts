import { expect, test } from '@playwright/test';

test('User can search for a movie and view details', async ({ page }) => {
  await page.goto('/');

  const searchInput = page.getByPlaceholder(
    'Search for movie & tv shows & actors',
  );
  await searchInput.fill('Dune Part Two');
  await searchInput.press('Enter');

  await expect(page.locator('text=Dune: Part Two')).toBeVisible();

  await page.locator('text=Dune: Part Two').first().click();

  await expect(page).toHaveURL(/\/details\/movie\/\d+/);

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Dune');
});
