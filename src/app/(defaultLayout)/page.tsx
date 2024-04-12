'use client';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { TrendingDataByType } from 'database.ds';
import { useRef } from 'react';

import { getTheMovieDBTrendingAPI } from '@/lib/TheMovieAPI';

import LoadingSkeleton from '@/components/loadingSkeleton';
import MediaCarousel from '@/components/MediaCarousel';
import MediaGrid from '@/components/MediaGrid';

export default function Home() {
  const { data, fetchNextPage, isError, isLoading } = useInfiniteQuery<
    TrendingDataByType<'all'>
  >({
    queryKey: ['trending-movie&tv-data'],
    queryFn: ({ pageParam = 1 }) => getTheMovieDBTrendingAPI('all', pageParam),
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

  if (isLoading) return <LoadingSkeleton />;

  if (isError) return <h1>error</h1>;

  return (
    <>
      <MediaCarousel
        title='Trending'
        data={data?.pages[0].results?.slice(0, 5)}
      />
      <h2 className='text-white mt-6 mb-6 md:mt-9'>Trending</h2>
      {data?.pages.map((page, i) => (
        <div key={i}>
          <MediaGrid data={page.results} ref={ref} />
        </div>
      ))}
    </>
  );
}
