'use client';
import { MovieTvDataType } from 'database.ds';
import { motion } from 'framer-motion';
import { useState } from 'react';

import MediaImage from '@/components/MediaCard/MediaImage';
import MediaInfo from '@/components/MediaCard/MediaInfo';
import MediaVideo from '@/components/MediaCard/MediaVideo';

type MovieTvCardProps = {
  media: MovieTvDataType;
  carousel?: boolean;
  type?: string;
  enableHoverEffect?: boolean;
};

export default function MovieTvCard({
  media,
  carousel,
  type,
  enableHoverEffect = false,
}: MovieTvCardProps) {
  const [hover, setHover] = useState(false);

  const motionProps = enableHoverEffect
    ? {
        whileHover: {
          scale: 1.2,
          zIndex: 50,
        },
        transition: {
          type: 'spring' as const,
          mass: 3,
          stiffness: 400,
          damping: 50,
        },
        onHoverStart: () => setHover(true),
        onHoverEnd: () => setHover(false),
      }
    : {};

  return (
    <motion.article
      {...motionProps}
      className='text-white flex-col text-left mx-auto cursor-pointer relative'
    >
      <>
        {enableHoverEffect && hover ? (
          <MediaVideo
            media={media}
            type={type}
            hover={hover}
            carousel={carousel}
          />
        ) : (
          <MediaImage media={media} type={type} carousel={carousel} />
        )}
      </>
      <div className={`${carousel && 'hidden'} flex justify-between`}>
        <MediaInfo media={media} type={type} />
      </div>
    </motion.article>
  );
}
