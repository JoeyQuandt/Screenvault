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
  const { data, isLoading, isError } = useQuery<CombinedMovieApiTypes>({
    queryKey: ['details', params.slug],
    queryFn: () => getTheMovieDBDetails(params.slug, 'movie'),
  });

  if (isLoading) return <Loading />;

  if (isError) return <h1>error</h1>;

  return (
    <>
      <Hero data={data.details} type='movie' />

      <section className='max-sm:px-4 md:px-6 lg:px-0 lg:pt-14 lg:pl-9 lg:ml-28 pb-20 lg:pb-32'>
        <SocialLinks data={data.details} type='movie' />
        <h2 className='text-white mb-5'>Summary</h2>
        <p className='text-white opacity-75 max-w-2xl'>
          {data?.details.overview}
        </p>
        {data.cast.cast.length !== 0 && (
          <MediaCarousel
            data={data.cast}
            title='Cast & Crew'
            cast
            className='py-4'
          />
        )}
        qw
        {data?.recommendation.results.length !== 0 && (
          <MediaCarousel
            data={data.recommendation.results}
            title='Recommandations'
            type='movie'
          />
        )}
        {data?.similar.results.length !== 0 && (
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
