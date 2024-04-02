'use client';

import { useQuery } from '@tanstack/react-query';
import { GetMovieDBDetailsType } from 'database.ds';

import { getTheMovieDBTvDetails } from '@/lib/TheMovieAPI';

export default function Page({
  params,
}: {
  params: { type: string; slug: number };
}) {
  const { data, isLoading, isError } = useQuery<GetMovieDBDetailsType<'tv'>>({
    queryKey: ['details', params.slug],
    queryFn: () => getTheMovieDBTvDetails(params.slug),
  });

  if (isLoading) return <h1>loading</h1>;

  if (isError) return <h1>error</h1>;

  return <h1 className='text-white'>{data?.name}</h1>;
}
