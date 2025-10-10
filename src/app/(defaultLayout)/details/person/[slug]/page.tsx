'use client';

import { useQuery } from '@tanstack/react-query';
import { CombinedPersonApiTypes } from 'database.ds';

import { getTheMovieDBPersonDetails } from '@/lib/TheMovieAPI';
import Transition from '@/lib/transition';

import Hero from '@/components/details/Hero';
import SocialLinks from '@/components/details/SocialLinks';
import MediaCarousel from '@/components/MediaCarousel';
import { ReadMore } from '@/components/ui/readmore';

import Loading from '@/app/loading';

export default function Page({
  params,
}: {
  params: { type: string; slug: number };
}) {
  const { data, isLoading } = useQuery<CombinedPersonApiTypes>({
    queryKey: ['details', params.slug],
    queryFn: () => getTheMovieDBPersonDetails(params.slug),
  });

  if (isLoading) return <Loading />;

  return (
    <Transition>
      {data && <Hero data={data.details} type='person' />}
      <section className='max-sm:px-4 md:px-6 lg:px-0 lg:pt-14 lg:pl-9 lg:ml-28 pb-20 lg:pb-32'>
        {data && <SocialLinks data={data.details} type='person' />}
        {data?.details.biography && (
          <>
            <h2 className='text-white mb-6'>Biography</h2>
            <ReadMore
              text={data?.details.biography}
              amountOfWords={100}
              className='text-white opacity-75 max-w-2xl'
            />
          </>
        )}
        {data?.combinedCredits.cast &&
          data.combinedCredits.cast.length !== 0 && (
            <MediaCarousel
              data={data.combinedCredits.cast}
              title='Known for'
              type='tv'
            />
          )}
      </section>
    </Transition>
  );
}
