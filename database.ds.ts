import { NormalizeOAS, OASOutput } from 'fets';
import openaiThemoviedb from 'openai-themoviedb';

export type TrendingDataByType<T extends MediaType> = T extends 'all'
  ? TrendingMovieTvDataType
  : T extends 'movie'
    ? TrendingMoviesType
    : T extends 'tv'
      ? TrendingTvType
      : never;

export type GetMovieDBDetailsType<T extends 'movie' | 'tv'> = T extends 'movie'
  ? DetailsMovietype
  : T extends 'tv'
    ? DetailsTvType
    : never;

export type MediaType = 'movie' | 'tv' | 'all';

export type NetWorkTvDataType = OASOutput<
  NormalizeOAS<typeof openaiThemoviedb>,
  '/3/tv/{series_id}/watch/providers',
  'get'
>;

export type NetWorkMovieDataType = OASOutput<
  NormalizeOAS<typeof openaiThemoviedb>,
  '/3/movie/{movie_id}/watch/providers',
  'get'
>;

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

export type DetailsTvType = OASOutput<
  NormalizeOAS<typeof openaiThemoviedb>,
  '/3/tv/{series_id}',
  'get'
>;

export type CombinedMovieApiTypes = {
  details: DetailsMovietype;
  cast: CastMovietype;
  similar: SimilarMovietype;
  recommendation: RecommendationTvtype;
};

export type DetailsMovietype = OASOutput<
  NormalizeOAS<typeof openaiThemoviedb>,
  '/3/movie/{movie_id}',
  'get'
>;

export type CastMovietype = OASOutput<
  NormalizeOAS<typeof openaiThemoviedb>,
  '/3/movie/{movie_id}/credits',
  'get'
>;

export type SimilarMovietype = OASOutput<
  NormalizeOAS<typeof openaiThemoviedb>,
  '/3/movie/{movie_id}/similar',
  'get'
>;

export type Trailertype = OASOutput<
  NormalizeOAS<typeof openaiThemoviedb>,
  '/3/tv/{series_id}/videos',
  'get'
>;

export type SimilarTvtype = OASOutput<
  NormalizeOAS<typeof openaiThemoviedb>,
  '/3/tv/{series_id}/similar',
  'get'
>;

export type RecommendationTvtype = OASOutput<
  NormalizeOAS<typeof openaiThemoviedb>,
  '/3/tv/{series_id}/recommendations',
  'get'
>;

export type CastTvtype = OASOutput<
  NormalizeOAS<typeof openaiThemoviedb>,
  '/3/tv/{series_id}/credits',
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
