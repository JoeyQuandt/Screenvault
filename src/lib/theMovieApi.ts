import type {
  CombinedMovieApiTypes,
  CombinedPersonApiTypes,
  CombinedTvApiTypes,
  MediaType,
  MovieList,
  MovieSortBy,
  PeopleList,
  Trailertype,
  TrendingDataByType,
  TvList,
  TvSortBy,
} from 'database.ds';

import { client } from '@/lib/client';

type TrendingEndpoint =
  | '/3/trending/all/{time_window}'
  | '/3/trending/movie/{time_window}'
  | '/3/trending/tv/{time_window}';

export async function getTheMovieDBTrendingAPI(
  type: MediaType,
  pageNr: number = 1,
): Promise<TrendingDataByType<'all'>> {
  const response = await client[
    `/3/trending/${type}/{time_window}` as TrendingEndpoint
  ].get({
    params: {
      time_window: 'week',
    },
    query: {
      page: pageNr,
    } as unknown as { language?: string },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
    },
  });

  const data = await response.json();

  return data as TrendingDataByType<'all'>;
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
      include_adult: false,
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
): Promise<CombinedMovieApiTypes | CombinedTvApiTypes> {
  const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
  };

  if (type === 'movie') {
    const [details, cast, similar, recommendation] = await Promise.all([
      client['/3/movie/{movie_id}'].get({
        params: { movie_id: id },
        headers,
      }),
      client['/3/movie/{movie_id}/credits'].get({
        params: { movie_id: id },
        headers,
      }),
      client['/3/movie/{movie_id}/similar'].get({
        params: { movie_id: id },
        headers,
      }),
      client['/3/movie/{movie_id}/recommendations'].get({
        params: { movie_id: id },
        headers,
      }),
    ]);

    return {
      details: (await details.json()) as CombinedMovieApiTypes['details'],
      cast: (await cast.json()) as CombinedMovieApiTypes['cast'],
      similar: (await similar.json()) as CombinedMovieApiTypes['similar'],
      recommendation:
        (await recommendation.json()) as CombinedMovieApiTypes['recommendation'],
    };
  }

  const [details, cast, similar, recommendation] = await Promise.all([
    client['/3/tv/{series_id}'].get({
      params: { series_id: id },
      headers,
    }),
    client['/3/tv/{series_id}/credits'].get({
      params: { series_id: id },
      headers,
    }),
    client['/3/tv/{series_id}/similar'].get({
      params: { series_id: id.toString() },
      headers,
    }),
    client['/3/tv/{series_id}/recommendations'].get({
      params: { series_id: id },
      headers,
    }),
  ]);

  return {
    details: (await details.json()) as CombinedTvApiTypes['details'],
    cast: (await cast.json()) as CombinedTvApiTypes['cast'],
    similar: (await similar.json()) as CombinedTvApiTypes['similar'],
    recommendation:
      (await recommendation.json()) as CombinedTvApiTypes['recommendation'],
  };
}

export async function getTheMovieDBTrailer(
  id: number,
  type: string | undefined,
): Promise<Trailertype['results']> {
  const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
  };

  let response;
  if (type === 'movie') {
    response = await client['/3/movie/{movie_id}/videos'].get({
      params: { movie_id: id },
      headers,
    });
  } else {
    response = await client['/3/tv/{series_id}/videos'].get({
      params: { series_id: id },
      headers,
    });
  }

  const data = await response.json();

  const trailer = data.results?.filter((item) => item.type === 'Trailer');
  return trailer || [];
}

export async function getTheMovieDBCast(id: number, type: string) {
  const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
  };

  let response;
  if (type === 'movie') {
    response = await client['/3/movie/{movie_id}/credits'].get({
      params: { movie_id: id },
      headers,
    });
  } else {
    response = await client['/3/tv/{series_id}/credits'].get({
      params: { series_id: id },
      headers,
    });
  }

  const data = await response.json();

  return data;
}

export async function getTheMovieDBSimilar(id: number, type: string) {
  const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
  };

  let response;
  if (type === 'movie') {
    response = await client['/3/movie/{movie_id}/similar'].get({
      params: { movie_id: id },
      headers,
    });
  } else {
    response = await client['/3/tv/{series_id}/similar'].get({
      params: { series_id: id.toString() },
      headers,
    });
  }

  const data = await response.json();

  return data;
}

export async function getTheMovieDBNetwork(id: number, type: string) {
  const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
  };

  let response;
  if (type === 'movie') {
    response = await client['/3/movie/{movie_id}/watch/providers'].get({
      params: { movie_id: id },
      headers,
    });
  } else {
    response = await client['/3/tv/{series_id}/watch/providers'].get({
      params: { series_id: id },
      headers,
    });
  }

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
