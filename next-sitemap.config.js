/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
  // !STARTERCONF Change the siteUrl
  /** Without additional '/' on the end, e.g. https://theodorusclarence.com */
  siteUrl: 'https://screenarchive.netlify.app/',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};

// Note: dynamic pages (like /details/movie/[slug]) need concrete param values
// for the sitemap. We add an `additionalPaths` function to fetch a small set
// of TMDB results at build-time and include their detail URLs.

// Limit how many pages to fetch per type to avoid long build times.
const PAGES_PER_TYPE = 2; // change to higher if you want more URLs

function slugify(title) {
  return title
    .toString()
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
    .replace(/[:–—_\\/]+/g, ' ')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function tmdbFetch(url) {
  const warn = () => {};
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
      },
    });
    if (!res.ok) {
      warn();
      return null;
    }
    return await res.json();
  } catch (err) {
    warn();
    return null;
  }
}

module.exports.additionalPaths = async function additionalPaths(_config) {
  const pages = [];

  // movies and tv
  for (const type of ['movie', 'tv']) {
    for (let page = 1; page <= PAGES_PER_TYPE; page++) {
      const url = `https://api.themoviedb.org/3/discover/${type}?page=${page}`;
      const data = await tmdbFetch(url);
      if (!data?.results) continue;
      for (const item of data.results) {
        const title = item.title || item.name || '';
        const slug = `${slugify(title)}-${item.id}`;
        pages.push({
          loc: `/details/${type}/${slug}`,
          lastmod: item.release_date || item.first_air_date || undefined,
        });
      }
    }
  }

  // popular people (first page)
  const peopleData = await tmdbFetch(
    'https://api.themoviedb.org/3/person/popular?page=1',
  );
  if (peopleData?.results) {
    for (const p of peopleData.results) {
      const slug = `${slugify(p.name || '')}-${p.id}`;
      pages.push({ loc: `/details/person/${slug}` });
    }
  }

  return pages;
};
