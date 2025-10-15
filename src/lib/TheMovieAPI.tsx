import type {
  CombinedMovieApiTypes,
  CombinedPersonApiTypes,
  MovieList,
  PeopleList,
  Trailertype,
  TrendingDataByType,
  TvList,
} from 'database.ds';

import { client } from '@/lib/client';

// Type definitions for sort_by parameters
export type MovieSortBy =
  | 'original_title.asc'
  | 'original_title.desc'
  | 'popularity.asc'
  | 'popularity.desc'
  | 'revenue.asc'
  | 'revenue.desc'
  | 'primary_release_date.asc'
  | 'title.asc'
  | 'title.desc'
  | 'primary_release_date.desc'
  | 'vote_average.asc'
  | 'vote_average.desc'
  | 'vote_count.asc'
  | 'vote_count.desc';

export type TvSortBy =
  | 'first_air_date.asc'
  | 'first_air_date.desc'
  | 'name.asc'
  | 'name.desc'
  | 'original_name.asc'
  | 'original_name.desc'
  | 'popularity.asc'
  | 'popularity.desc'
  | 'vote_average.asc'
  | 'vote_average.desc'
  | 'vote_count.asc'
  | 'vote_count.desc';

export async function getTheMovieDBTrendingAPI(
  type: string,
  pageNr?: unknown,
): Promise<TrendingDataByType<'all'>> {
  // @ts-expect-error Dynamic template literal endpoint not generated in API types
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

export async function getTheMovieDBPeopleAPI(
  pageNr?: number | undefined,
): Promise<PeopleList> {
  const response = await client['/3/person/popular'].get({
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

export async function getTheMovieDBDetails(
  id: number,
  type: string,
): Promise<CombinedMovieApiTypes> {
  // @ts-expect-error Dynamic template literal endpoint not generated in API types
  const details = await client[`/3/${type}/{series_id}`].get({
    params: {
      series_id: id,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
    },
  });
  // @ts-expect-error Dynamic template literal endpoint not generated in API types
  const detailsCast = await client[`/3/${type}/{series_id}/credits`].get({
    params: {
      series_id: id,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
    },
  });
  // @ts-expect-error Dynamic template literal endpoint not generated in API types
  const detailsSimilar = await client[`/3/${type}/{movie_id}/similar`].get({
    params: {
      movie_id: id,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
    },
  });

  // @ts-expect-error Dynamic template literal endpoint not generated in API types
  const detailsRecommendation = await client[
    `/3/${type}/{movie_id}/recommendations`
  ].get({
    params: {
      movie_id: id,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
    },
  });

  const dataDetails = await details.json();
  const dataCast = await detailsCast.json();
  const dataSimilar = await detailsSimilar.json();
  const dataRecommendation = await detailsRecommendation.json();

  return {
    details: dataDetails,
    cast: dataCast,
    similar: dataSimilar,
    recommendation: dataRecommendation,
  };
}

export async function getTheMovieDBTrailer(
  id: number,
  type: string | undefined,
): Promise<Trailertype['results']> {
  // @ts-expect-error Dynamic template literal endpoint not generated in API types
  const response = await client[`/3/${type}/{series_id}/videos`].get({
    params: {
      series_id: id,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
    },
  });

  const data = await response.json();

  const trailer = data.results.filter(
    (item: { type: string }) => item.type === 'Trailer',
  );
  return trailer;
}

export async function getTheMovieDBCast(id: number, type: string) {
  // @ts-expect-error Dynamic template literal endpoint not generated in API types
  const response = await client[`/3/${type}/{series_id}/credits`].get({
    params: {
      movie_id: id,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
    },
  });

  const data = await response.json();

  return data;
}

export async function getTheMovieDBSimilar(id: number, type: string) {
  // @ts-expect-error Dynamic template literal endpoint not generated in API types
  const response = await client[`/3/${type}/{movie_id}/similar`].get({
    params: {
      movie_id: id,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
    },
  });

  const data = await response.json();

  return data;
}

export async function getTheMovieDBNetwork(id: number, type: string) {
  // @ts-expect-error Dynamic template literal endpoint not generated in API types
  const response = await client[`/3/${type}/{series_id}/watch/providers`].get({
    params: {
      series_id: id,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
    },
  });

  const data = await response.json();

  return data.results;
}

export async function getTheMovieDBPersonDetails(
  id: number,
): Promise<CombinedPersonApiTypes> {
  const details = await client[`/3/person/{person_id}`].get({
    params: {
      person_id: id,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
    },
  });

  const combinedCredits = await client[
    `/3/person/{person_id}/combined_credits`
  ].get({
    params: {
      person_id: id.toString(),
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
    },
  });

  const personDetails = await details.json();
  const personCombinedCredits = await combinedCredits.json();

  return {
    details: personDetails,
    combinedCredits: personCombinedCredits,
  };
}

export async function getTheMovieDBList(
  sort_by: TvSortBy,
  score: number,
  genreList: string,
  pageNr: number,
  voteCount: number,
): Promise<TvList> {
  const list = await client[`/3/discover/tv`].get({
    query: {
      language: 'en-US',
      sort_by: sort_by,
      'vote_average.gte': score,
      with_genres: genreList,
      page: pageNr,
      'vote_count.gte': voteCount,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
    },
  });

  const tvList = await list.json();
  return tvList;
}

export async function getTheMovieDBMovieFilter(
  sort_by: MovieSortBy,
  score: number,
  genreList: string,
  pageNr: number,
  voteCount: number,
): Promise<MovieList> {
  const list = await client['/3/discover/movie'].get({
    query: {
      language: 'en-US',
      sort_by: sort_by,
      'vote_average.gte': score,
      with_genres: genreList,
      page: pageNr,
      'vote_count.gte': voteCount,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
    },
  });

  const movieList = await list.json();

  return movieList;
}
