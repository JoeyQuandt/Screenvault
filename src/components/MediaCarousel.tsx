'use client';

import {
  CombinedMovieApiTypes,
  CombinedTvApiTypes,
  TrendingMovieTvDataType,
} from 'database.ds';

import MediaCard from '@/components/MediaCard/MediaCard';
import MediaCast from '@/components/MediaCard/MediaCast';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

type MediaCarouselProps = {
  title: string;
  data:
    | TrendingMovieTvDataType['results']
    | CombinedMovieApiTypes['cast']
    | CombinedMovieApiTypes['recommendation']['results']
    | CombinedMovieApiTypes['similar']['results']
    | CombinedTvApiTypes['cast']
    | CombinedTvApiTypes['recommendation']['results']
    | CombinedTvApiTypes['similar']['results'];
  type?: 'movie' | 'tv';
  cast?: boolean;
  className?: string;
};

export default function MediaCarousel({
  title,
  data,
  type,
  cast,
  ...props
}: MediaCarouselProps) {
  return (
    <section {...props}>
      <h2 className='text-white mt-6 mb-6 md:mt-9'>{title}</h2>
      <Carousel className='w-full group'>
        <CarouselContent className='-ml-4'>
          {cast && data && !Array.isArray(data)
            ? [
                ...((data as CombinedMovieApiTypes['cast']).cast || []),
                ...((data as CombinedMovieApiTypes['cast']).crew || []),
              ].map((item, index) => {
                return (
                  <CarouselItem
                    key={index}
                    className={`basis-1/2  ${cast ? 'md:basis-1/4 lg:basis-1/5' : 'md:basis-1/3'} pl-4`}
                  >
                    <MediaCast data={item} />
                  </CarouselItem>
                );
              })
            : Array.isArray(data) &&
              data?.map((item, index) => {
                return (
                  <CarouselItem
                    key={index}
                    className=' basis-[75%] md:basis-1/3 pl-4'
                  >
                    <MediaCard
                      media={item}
                      carousel
                      type={type}
                      showTrailer={false}
                    />
                  </CarouselItem>
                );
              })}
        </CarouselContent>
        <CarouselPrevious className='hidden md:flex left-4 opacity-0 group-hover:opacity-100 disabled:hidden transition-opacity duration-300' />
        <CarouselNext className='hidden md:flex right-4 opacity-0 group-hover:opacity-100 disabled:hidden transition-opacity duration-300' />
      </Carousel>
    </section>
  );
}
