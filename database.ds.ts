import { NormalizeOAS, OASOutput } from 'fets';
import openaiThemoviedb from 'openai-themoviedb';

export type TrendingDataByType<T extends MediaType> = T extends 'all'
  ? TrendingMovieTvDataType
  : T extends 'movie'
    ? TrendingMoviesType
    : T extends 'tv'
      ? TrendingTvType
      : never;

export type GetMovieDBDetailsType<T extends 'movie' | 'tv' | 'person'> =
  T extends 'movie'
    ? DetailsMovietype
    : T extends 'tv'
      ? DetailsTvType
      : T extends 'person'
        ? DetailsPersonType
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

export type CombinedPersonApiTypes = {
  details: DetailsPersonType;
  combinedCredits: DetailsPersonCombinedCreditType;
};

export type DetailsMovietype = OASOutput<
  NormalizeOAS<typeof openaiThemoviedb>,
  '/3/movie/{movie_id}',
  'get'
>;

export type DetailsPersonType = OASOutput<
  NormalizeOAS<typeof openaiThemoviedb>,
  '/3/person/{person_id}',
  'get'
>;

export type DetailsPersonCombinedCreditType = OASOutput<
  NormalizeOAS<typeof openaiThemoviedb>,
  '/3/person/{person_id}/combined_credits',
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

export type TvList = OASOutput<
  NormalizeOAS<typeof openaiThemoviedb>,
  '/3/discover/tv',
  'get'
>;

export type MovieList = OASOutput<
  NormalizeOAS<typeof openaiThemoviedb>,
  '/3/discover/movie',
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
  id: number;
  media_type?: string | undefined;
  first_air_date?: string | undefined;
  genre_ids?: number[] | undefined;
  popularity: number;
  release_date?: string | undefined;
  video?: boolean;
  vote_average?: number;
  name?: string | undefined;
  imdb_id?: string | undefined;
  biography?: string | undefined;
  homepage?: unknown;
  also_known_as?: string[] | undefined;
  birthday?: string | undefined;
  deathday?: unknown;
  known_for_department?: string | undefined;
  gender?: number;
  profile_path?: string;
  adult?: boolean;
};
