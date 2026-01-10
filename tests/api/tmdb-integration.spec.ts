import { expect, test } from '@playwright/test';

test.describe('TMDB API Contract', () => {
  test('Trending API endpoint should return valid schema', async ({
    request,
  }) => {
    const response = await request.get(
      'https://api.themoviedb.org/3/movie/popular',
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
        },
      },
    );
    expect(response.ok()).toBeTruthy();

    const data = await response.json();

    expect(Array.isArray(data.results)).toBe(true);
    expect(data.results.length).toBeGreaterThan(0);

    const firstMovie = data.results[0];

    // Check fields that your app relies on
    expect(firstMovie).toHaveProperty('id');
    expect(firstMovie).toHaveProperty('title');
    expect(typeof firstMovie.id).toBe('number');
  });
});
