import { NormalizeOAS, OASOutput } from 'fets';
import openaiThemoviedb from 'openai-themoviedb';

export type TrendingMovieDataType = OASOutput<
  NormalizeOAS<typeof openaiThemoviedb>,
  '/3/trending/all/{time_window}',
  'get'
>;
