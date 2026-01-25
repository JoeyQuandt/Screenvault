import { expect, test } from '@playwright/test';

test('Media card is displaying in the home page', async ({ page }) => {
  await page.goto('/');

  const mediaCard = page.getByTestId('1');

  await expect(mediaCard).toBeVisible();
});
