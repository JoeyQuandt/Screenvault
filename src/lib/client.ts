import { createClient, NormalizeOAS } from 'fets';
import openaiThemoviedb from 'openai-themoviedb';

export const client = createClient<NormalizeOAS<typeof openaiThemoviedb>>({
  endpoint: 'https://api.themoviedb.org',
});
