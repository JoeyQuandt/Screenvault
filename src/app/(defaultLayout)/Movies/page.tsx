'use client';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { TrendingDataByType } from 'database.ds';
import { useRef } from 'react';

import { getTheMovieDBTrendingAPI } from '@/lib/TheMovieAPI';

import MediaGrid from '@/components/MediaGrid';

export default function Home() {
  const { data, fetchNextPage, isError, isLoading } = useInfiniteQuery<
    TrendingDataByType<'movie'>
  >({
    queryKey: ['trending-movie-data'],
    queryFn: ({ pageParam = 1 }) =>
      getTheMovieDBTrendingAPI('movie', pageParam),
    initialPageParam: 1,
    getNextPageParam: (pages) => pages.page + 1,
  });

  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });
  /*Ref for infinite loading*/
  if (entry?.isIntersecting) fetchNextPage();

  if (isLoading) return <h1>loading</h1>;

  if (isError) return <h1>error</h1>;

  return (
    <>
      <h2 className='text-white mt-6 mb-6 md:mt-9'>Trending Movies</h2>
      {data?.pages.map((page, i) => (
        <div key={i}>
          <MediaGrid data={page.results} ref={ref} />
        </div>
      ))}
    </>
  );
}
