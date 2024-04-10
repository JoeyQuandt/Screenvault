import { client } from '@/lib/client';

export async function getTheMovieDBTrendingAPI(type: string, pageNr?: unknown) {
  // @ts-expect-error this page is not generated in the API that is why this commented
  const response = await client[`/3/trending/${type}/{time_window}`].get({
    params: {
      time_window: 'week',
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
      Authorization: `Bearer ${process.env.MOVIEDB_API_KEY}`,
    },
  });

  const data = await response.json();
  return data;
}

export async function getTheMovieDBTvDetails(id: number) {
  const response = await client['/3/tv/{series_id}'].get({
    params: {
      series_id: id,
    },
    headers: {
      Authorization: `Bearer ${process.env.MOVIEDB_API_KEY}`,
    },
  });
  const data = await response.json();

  return data;
}

export async function getTheMovieDBMovieDetails(id: number) {
  const response = await client['/3/movie/{movie_id}'].get({
    params: {
      movie_id: id,
    },
    headers: {
      Authorization: `Bearer ${process.env.MOVIEDB_API_KEY}`,
    },
  });

  const data = await response.json();

  return data;
}
