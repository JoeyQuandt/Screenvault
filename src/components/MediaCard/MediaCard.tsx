'use client';
import { MovieTvDataType } from 'database.ds';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

import useCheckMobileScreen from '@/hooks/useCheckMobileScreen';

import MediaImage from '@/components/MediaCard/MediaImage';
import MediaVideo from '@/components/MediaCard/MediaVideo';
import { Bullet, Movies, Tv } from '@/components/svgs';

type MediaCardProps = {
  media: MovieTvDataType;
  carousel?: boolean;
  type?: 'movie' | 'tv';
  showTrailer?: boolean;
};

export default function MediaCard({
  media,
  carousel,
  type,
  showTrailer = true,
}: MediaCardProps) {
  const isMobile = useCheckMobileScreen();
  const [hover, setHover] = useState(false);

  return (
    <Link
      className='z-40'
      href={`/details/${media?.media_type ? media.media_type : type}/${media?.id}`}
    >
      {showTrailer && !isMobile ? (
        <motion.article
          whileHover={{
            scale: 1.2,
            zIndex: 50,
          }}
          transition={{
            type: 'spring',
            mass: 3,
            stiffness: 400,
            damping: 50,
          }}
          onHoverStart={() => setHover(true)}
          onHoverEnd={() => setHover(false)}
          className='text-white flex-col text-left mx-auto cursor-pointer relative'
        >
          <>
            {hover ? (
              <MediaVideo media={media} hover={hover} carousel={carousel} />
            ) : (
              <MediaImage media={media} type={type} carousel={carousel} />
            )}
          </>
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
              <li className='uppercase'>
                {media?.vote_average
                  ? media?.vote_average.toFixed(1)
                  : 'No Score'}
              </li>
            </ul>
            <h3 className='font-medium'>{media?.title || media?.name}</h3>
          </div>
        </motion.article>
      ) : (
        <article className='text-white flex-col text-left mx-auto cursor-pointer'>
          <MediaImage media={media} type={type} carousel={carousel} />
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
              <li className='uppercase'>
                {media?.vote_average
                  ? media?.vote_average.toFixed(1)
                  : 'No Score'}
              </li>
            </ul>
            <h3 className='font-medium'>{media?.title || media?.name}</h3>
          </div>
        </article>
      )}
    </Link>
  );
}
