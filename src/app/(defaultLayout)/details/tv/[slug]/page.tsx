'use client';

import { useQuery } from '@tanstack/react-query';
import { CombinedMovieApiTypes } from 'database.ds';

import { getTheMovieDBDetails } from '@/lib/TheMovieAPI';

import Hero from '@/components/details/Hero';
import SocialLinks from '@/components/details/SocialLinks';
import MediaCarousel from '@/components/MediaCarousel';

import Loading from '@/app/loading';

export default function Page({
  params,
}: {
  params: { type: string; slug: number };
}) {
  const { data, isLoading } = useQuery<CombinedMovieApiTypes>({
    queryKey: ['details', params.slug],
    queryFn: () => getTheMovieDBDetails(params.slug, 'tv'),
  });

  if (isLoading) return <Loading />;

  return (
    <>
      {data && <Hero data={data.details} type='tv' />}
      <section className='max-sm:px-4 md:px-6 lg:px-0 lg:pt-14 lg:pl-9 lg:ml-28 pb-20 lg:pb-32'>
        {data && <SocialLinks data={data.details} type='tv' />}
        <h2 className='text-white'>Summary</h2>
        <p className='text-white opacity-75 max-w-2xl'>
          {data?.details.overview}
        </p>
        {data?.cast && (
          <MediaCarousel
            data={data.cast}
            title='Cast & Crew'
            cast
            className='py-4'
          />
        )}
        {data?.recommendation && (
          <MediaCarousel
            data={data.recommendation.results}
            title='Recommandations'
            type='tv'
          />
        )}
        {data?.similar && (
          <MediaCarousel
            data={data.similar.results}
            title='Similar'
            type='tv'
          />
        )}
      </section>
    </>
  );
}
