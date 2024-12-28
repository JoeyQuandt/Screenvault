'use client';

import { MovieTvDataType } from 'database.ds';
import { Star } from 'lucide-react';

import { imageUrlHigh } from '@/lib/config';
import { imageUrl } from '@/lib/config';
import WatchProvider from '@/components/details/WatchProvider';
import NextImage from '@/components/NextImage';
import { Movies, Tv } from '@/components/svgs';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export type DetailProps = {
  data: MovieTvDataType;
  type: string;
};

export default function Hero({ data, type }: DetailProps) {
  return (
    <NextImage
      src={
        data?.backdrop_path
          ? imageUrlHigh + data?.backdrop_path
          : '/images/background.jpg'
      }
      alt='Media thumbnail'
      className='overflow-hidden object-center cursor-pointer w-full h-[587px] lg:h-[547px] relative lg:rounded-[8px]'
      classNamesImages='object-cover object-top'
      fill
      gradient={true}
    >
      <section className='absolute  top-28 md:top-90 max-sm:left-4 md:left-6 lg:top-16 lg:left-36  z-10'>
        <Breadcrumb
          className={`${type === 'movie' || type === 'tv' ? 'lg:mb-52 md:mb-40 mb-48' : 'mb-8'}`}
        >
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className='text-white text-lg hover:text-theme-red'
                href={`/${type === 'person' ? '' : type === 'tv' ? 'Tv' : 'Movies'}`}
              >
                {type}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className='text-white' />
            <BreadcrumbItem>
              <BreadcrumbPage className='text-white text-lg'>
                {data.name || data.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div>
          <WatchProvider id={data.id} type={type} />
          {data.profile_path && (
            <img
              src={
                data.profile_path
                  ? imageUrl + data.profile_path
                  : '/images/placeholder.jpg'
              }
              className='h-[250px] w-full object-cover rounded-[8px] mb-4 max-w-[192px]'
              alt='Media thumbnail'
            />
          )}
          <h1 className='text-white mb-6'>{data?.name || data.title}</h1>
          <div className='flex gap-2'>
            {type === 'movie' || type === 'tv' ? (
              <>
                <Badge className='flex items-center gap-1'>
                  {type === 'movie' ? (
                    <>
                      <Movies className='h3 w-auto' />
                      Movie
                    </>
                  ) : (
                    <>
                      <Tv className='h-3 w-auto' />
                      Tv
                    </>
                  )}
                </Badge>
                <Badge>
                  {data.first_air_date ||
                    (data.release_date &&
                      new Date(
                        data?.first_air_date || data?.release_date,
                      ).getFullYear())}
                </Badge>
                <Badge className='flex items-center gap-1'>
                  <Star className='h-3 w-auto' />
                  {data?.vote_average
                    ? data?.vote_average.toFixed(1)
                    : 'No Score'}
                </Badge>
              </>
            ) : (
              <>
                <Badge className='flex items-center gap-1'>
                  {data.known_for_department}
                </Badge>
              </>
            )}
          </div>
        </div>
      </section>
    </NextImage>
  );
}
