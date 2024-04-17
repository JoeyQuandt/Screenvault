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
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
    },
  });

  const data = await response.json();
  return data;
}

export async function getTheMovieDBDetails(id: number, type: string) {
  // @ts-expect-error this is not generated in the API that is why this commented
  const details = await client[`/3/${type}/{series_id}`].get({
    params: {
      series_id: id,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
    },
  });
  // @ts-expect-error this is not generated in the API that is why this commented
  const detailsCast = await client[`/3/${type}/{series_id}/credits`].get({
    params: {
      series_id: id,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
    },
  });
  // @ts-expect-error this is not generated in the API that is why this commented
  const detailsSimilar = await client[`/3/${type}/{movie_id}/similar`].get({
    params: {
      movie_id: id,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
    },
  });

  // @ts-expect-error this is not generated in the API that is why this commented
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

export async function getTheMovieDBTrailer(id: number, type: string) {
  // @ts-expect-error this is not generated in the API that is why this commented
  const response = await client[`/3/${type}/{series_id}/videos`].get({
    params: {
      series_id: id,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
    },
  });

  const data = await response.json();

  const trailer = data.results.filter((item) => item.type === 'Trailer');
  return trailer;
}

// export async function getTheMovieDBCast(id: number, type: string) {
//   // @ts-expect-error this is not generated in the API that is why this commented
//   const response = await client[`/3/${type}/{series_id}/credits`].get({
//     params: {
//       movie_id: id,
//     },
//     headers: {
//       Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
//     },
//   });

//   const data = await response.json();

//   return data;
// }

// export async function getTheMovieDBSimilar(id: number, type: string) {
//   // @ts-expect-error this is not generated in the API that is why this commented
//   const response = await client[`/3/${type}/{movie_id}/similar`].get({
//     params: {
//       movie_id: id,
//     },
//     headers: {
//       Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_API_KEY}`,
//     },
//   });

//   const data = await response.json();

//   return data;
// }
