import { client } from '@/lib/client';

export async function getTheMovieDBTrendingAPI(pageNr?: number) {
  const response = await client['/3/trending/all/{time_window}'].get({
    params: {
      time_window: 'day',
    },
    query: {
      page: pageNr,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
    },
  });

  const data = await response.json();
  return data;
}

export async function getTheMovieDBSearchApi(keyword: string) {
  const response = await client['/3/search/multi'].get({
    query: {
      query: keyword,
      include_adult: true,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
    },
  });

  const data = await response.json();
  return data;
}
