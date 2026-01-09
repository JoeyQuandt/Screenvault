'use client';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PeopleList } from 'database.ds';
import { useRef } from 'react';

import { getTheMovieDBPeopleAPI } from '@/lib/theMovieApi';
import Transition from '@/lib/transition';

import MediaGrid from '@/components/MediaGrid';

import Loading from '@/app/loading';

export default function Home() {
  const { data, fetchNextPage, isError, isLoading } =
    useInfiniteQuery<PeopleList>({
      queryKey: ['trending-people'],
      queryFn: ({ pageParam = 1 }) =>
        getTheMovieDBPeopleAPI(pageParam as number),
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

  if (isLoading) return <Loading />;

  if (isError) return <h1>error</h1>;

  return (
    <Transition>
      <h2 className='text-white mt-6 mb-6 md:mt-9'>Popular Actors</h2>

      {data?.pages.map((page, i) => (
        <div key={i}>
          <MediaGrid data={page.results} ref={ref} type='person' />
        </div>
      ))}
    </Transition>
  );
}
