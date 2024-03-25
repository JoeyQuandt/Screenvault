'use client';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { TrendingMovieDataType } from 'database.ds';
import { useRef } from 'react';

import { getTheMovieDBTrendingAPI } from '@/lib/TheMovieAPI';

import SearchInput from '@/components/input/SearchInput';
import MediaGrid from '@/components/MediaGrid';

export default function Home() {
  const { data, fetchNextPage, isFetchingNextPage, isError, isLoading } =
    useInfiniteQuery<TrendingMovieDataType>({
      queryKey: ['trending-movie-data'],
      queryFn: ({ pageParam = 1 }) => getTheMovieDBTrendingAPI(pageParam),
      initialPageParam: 1,
      getNextPageParam: (pages) => pages.page + 1,
    });

  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  if (entry?.isIntersecting) fetchNextPage();

  if (isLoading) return <h1>loading</h1>;

  if (isError) return <h1>error</h1>;

  return (
    <>
      <SearchInput
        placeholder='Search for movies or TV series'
        maxWidth={false}
      />
      {/* <MediaCarousel title='Trending' data={data?.results?.slice(0, 5)} /> */}
      {data?.pages.map((page, i) => (
        <div key={i}>
          <MediaGrid title='Recommened for you' data={page.results} ref={ref} />
        </div>
      ))}
      <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
        {isFetchingNextPage ? 'loading more...' : 'Load More'}
      </button>
    </>
  );
}
