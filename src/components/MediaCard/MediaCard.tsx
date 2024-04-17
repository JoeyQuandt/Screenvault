'use client';
import { useQuery } from '@tanstack/react-query';
import { MovieTvDataType } from 'database.ds';
import { Trailertype } from 'database.ds';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ReactPlayer from 'react-player';

import { getTheMovieDBTrailer } from '@/lib/TheMovieAPI';

import { SignedIn } from '@/components/auth';
import NextImage from '@/components/NextImage';
import { Bullet, Movies, Tv } from '@/components/svgs';
import BookmarkButton from '@/components/ui/bookMarkButton';

import { imageUrl } from '@/constants/config';

type MediaCardProps = {
  media: MovieTvDataType;
  carousel?: boolean;
  type?: 'movie' | 'tv';
};

export default function MediaCard({ media, carousel, type }: MediaCardProps) {
  const [hover, setHover] = useState(false);
  const { data, isLoading, isError } = useQuery<Trailertype>({
    queryKey: ['trailer', media.id],
    queryFn: () => getTheMovieDBTrailer(media.id, media?.media_type),
  });
  const pathname = usePathname();

  return (
    <article className='text-white flex-col text-left mx-auto'>
      {data?.length > 0 && (
        <div
          onMouseEnter={(e: React.MouseEvent) => setHover(true)}
          onMouseLeave={(e: React.MouseEvent) => setHover(false)}
        >
          {hover ? (
            <Link
              href={`/details/${media?.media_type ? media.media_type : type}/${media?.id}`}
            >
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${data[0].key}`}
                width='100%'
                height='174px'
                className={`overflow-hidden object-cover cursor-pointer rounded-[8px]  h-[110px] w-full md:h-[140px] ${carousel ? 'lg:h-[230px]' : 'lg:h-[174px]'} relative mb-2`}
                controls={false}
                playing={hover}
                loop={true}
                muted
              />
            </Link>
          ) : (
            <NextImage
              src={imageUrl + media?.backdrop_path}
              alt='Media thumbnail'
              className={`overflow-hidden cursor-pointer rounded-[8px]  h-[110px] w-full  md:h-[140px] ${carousel ? 'lg:h-[230px]' : 'lg:h-[174px]'} relative mb-2`}
              classNamesImages='rounded-[8px] object-cover'
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              gradient={carousel}
              href={`/details/${media?.media_type ? media.media_type : type}/${media?.id}`}
              useSkeleton
            >
              {carousel && (
                <div className='absolute bottom-2 left-2 z-10'>
                  <ul className='flex items-center gap-[6px] mb-2 opacity-1 text-sm'>
                    <li>
                      {new Date(
                        media?.first_air_date || media?.release_date || '',
                      ).getFullYear()}
                    </li>
                    <Bullet className='w-[2px] h-[2px]' />
                    <li className='flex items-center gap-1'>
                      {media?.media_type === 'movie' || type === 'movie' ? (
                        <>
                          <Movies /> Movie
                        </>
                      ) : (
                        <>
                          <Tv />
                          Tv
                        </>
                      )}
                    </li>
                    <Bullet className='w-[2px] h-[2px]' />
                    <li className='uppercase'>
                      {media?.vote_average && media?.vote_average.toFixed(1)}
                    </li>
                  </ul>
                  <h3 className='font-medium'>{media?.title || media?.name}</h3>
                </div>
              )}
              <SignedIn>
                {pathname !== '/Bookmark' && (
                  <BookmarkButton
                    data={media}
                    title={media?.title || media?.name}
                    id={media?.id}
                    className='absolute text-transparent bg-theme-darkBlue bg-opacity-50 z-10 right-2 top-2 transition ease-in-out hover:text-theme-white'
                  />
                )}
              </SignedIn>
            </NextImage>
          )}
        </div>
      )}
      <div className={`${carousel && 'hidden'}`}>
        <ul className='flex items-center gap-[6px] mb-2 opacity-75 text-sm'>
          <li>
            {new Date(
              media?.first_air_date || media?.release_date || '',
            ).getFullYear()}
          </li>
          <Bullet className='w-[2px] h-[2px]' />
          <li className='flex items-center gap-1'>
            {media?.media_type === 'movie' ? (
              <>
                <Movies /> Movie
              </>
            ) : (
              <>
                <Tv />
                Tv
              </>
            )}
          </li>
          <Bullet className='w-[2px] h-[2px]' />
          <li className='uppercase'>{media?.vote_average.toFixed(1)}</li>
        </ul>
        <h3 className='font-medium'>{media?.title || media?.name}</h3>
      </div>
    </article>
  );
}
