'use client';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { TrendingDataByType } from 'database.ds';
import { useRef } from 'react';

import { getTheMovieDBTrendingAPI } from '@/lib/TheMovieAPI';
import Transition from '@/lib/transition';

import MediaGrid from '@/components/MediaGrid';
import Filter from '@/components/filter/Filter';

import Loading from '@/app/loading';

export default function Home() {
  const { data, fetchNextPage, isError, isLoading } = useInfiniteQuery<
    TrendingDataByType<'all'>
  >({
    queryKey: ['trending-tv-data'],
    queryFn: ({ pageParam = 1 }) => getTheMovieDBTrendingAPI('tv', pageParam),
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

  if (isError) return <h1>error</h1>;

  if (isLoading) return <Loading />;

  return (
    <Transition>
      <div className='flex justify-between items-center'>
        <h2 className='text-white mt-6 mb-6 md:mt-9'>Trending Tv</h2>
        <Filter />
      </div>
      {data?.pages.map((page, i) => (
        <div key={i}>
          <MediaGrid data={page.results} ref={ref} />
        </div>
      ))}
    </Transition>
  );
}
