'use client';

import { useQuery } from '@tanstack/react-query';
import { GetMovieDBDetailsType } from 'database.ds';

import { getTheMovieDBMovieDetails } from '@/lib/TheMovieAPI';

export default function Page({
  params,
}: {
  params: { type: string; slug: number };
}) {
  const { data, isLoading, isError } = useQuery<GetMovieDBDetailsType<'movie'>>(
    {
      queryKey: ['details', params.slug],
      queryFn: () => getTheMovieDBMovieDetails(params.slug),
    },
  );

  if (isLoading) return <h1>loading</h1>;

  if (isError) return <h1>error</h1>;

  return <h1 className='text-white'>{data?.title}</h1>;
}
