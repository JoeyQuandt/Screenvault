'use client';

import { useQuery } from '@tanstack/react-query';
import { GetMovieDBDetailsType } from 'database.ds';

import { getTheMovieDBDetails } from '@/lib/TheMovieAPI';

import Hero from '@/components/details/Hero';
import SocialLinks from '@/components/details/SocialLinks';
import MediaCarousel from '@/components/MediaCarousel';

export default function Page({
  params,
}: {
  params: { type: string; slug: number };
}) {
  const { data, isLoading, isError } = useQuery<GetMovieDBDetailsType<'tv'>>({
    queryKey: ['details', params.slug],
    queryFn: () => getTheMovieDBDetails(params.slug, 'tv'),
  });

  if (isLoading) return <h1>loading</h1>;

  if (isError) return <h1>error</h1>;

  return (
    <>
      <Hero data={data.details} type='tv' />

      <section className='max-sm:px-4 md:px-6 lg:px-0 lg:pt-14 lg:pl-9 lg:ml-28 pb-20 lg:pb-32'>
        <SocialLinks data={data.details} type='tv' />
        <h2 className='text-white'>Summary</h2>
        <p className='text-white opacity-75 max-w-2xl'>
          {data?.details.overview}
        </p>
        {data.cast && (
          <MediaCarousel
            data={data.cast}
            title='Cast & Crew'
            cast
            className='py-4'
          />
        )}
        {data.similar.results && (
          <MediaCarousel
            data={data.similar.results}
            title='Similar'
            type='tv'
            className='py-4'
          />
        )}
        {data.recommendation && (
          <MediaCarousel
            data={data.recommendation.results}
            title='Recommandations'
            type='tv'
          />
        )}
      </section>
    </>
  );
}
