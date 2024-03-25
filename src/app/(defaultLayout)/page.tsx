'use client';
import { useQuery } from '@tanstack/react-query';
import { TrendingMovieDataType } from 'database.ds';

import { getTheMovieDBTrendingAPI } from '@/lib/TheMovieAPI';

import SearchInput from '@/components/input/SearchInput';
import MediaCarousel from '@/components/MediaCarousel';
import MediaGrid from '@/components/MediaGrid';

export default function Home() {
  const { data, isError, isLoading } = useQuery<TrendingMovieDataType>({
    queryKey: ['trending-movie-data'],
    queryFn: () => getTheMovieDBTrendingAPI(),
  });

  if (isLoading) return <h1>loading</h1>;

  if (isError) return <h1>error</h1>;

  console.log(data?.results?.slice(0, 5));

  return (
    <>
      <SearchInput
        placeholder='Search for movies or TV series'
        maxWidth={false}
      />
      <MediaCarousel title='Trending' data={data?.results?.slice(0, 5)} />
      <MediaGrid title='Recommened for you' data={data?.results} />
    </>
  );
}
