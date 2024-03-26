import { NormalizeOAS, OASOutput } from 'fets';
import openaiThemoviedb from 'openai-themoviedb';

export type TrendingDataByType<T extends MediaType> = T extends 'all'
  ? TrendingMovieTvDataType
  : T extends 'movie'
    ? TrendingMoviesType
    : T extends 'tv'
      ? TrendingTvType
      : never;

export type MediaType = 'movie' | 'tv' | 'all';

export type TrendingMovieTvDataType = OASOutput<
  NormalizeOAS<typeof openaiThemoviedb>,
  '/3/trending/all/{time_window}',
  'get'
>;

export type TrendingMoviesType = OASOutput<
  NormalizeOAS<typeof openaiThemoviedb>,
  '/3/trending/movie/{time_window}',
  'get'
>;

export type TrendingTvType = OASOutput<
  NormalizeOAS<typeof openaiThemoviedb>,
  '/3/trending/tv/{time_window}',
  'get'
>;

export type MovieTvDataType = {
  title?: string | undefined;
  backdrop_path?: string | undefined;
  original_language?: string | undefined;
  original_title?: string | undefined;
  overview?: string | undefined;
  poster_path?: string | undefined;
  vote_count?: number;
  adult: boolean;
  id: number;
  media_type?: string | undefined;
  first_air_date?: string | undefined;
  genre_ids?: number[] | undefined;
  popularity: number;
  release_date?: string | undefined;
  video: boolean;
  vote_average: number;
  name?: string | undefined;
};
