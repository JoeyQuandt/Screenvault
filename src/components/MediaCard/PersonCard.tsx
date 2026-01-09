'use client';
import { MovieTvDataType } from 'database.ds';
import { motion } from 'framer-motion';

import MediaImage from '@/components/MediaCard/MediaImage';

type PersonCardProps = {
  media: MovieTvDataType;
  carousel?: boolean;
};

export default function PersonCard({ media, carousel }: PersonCardProps) {
  return (
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
      className='text-white flex-col text-left mx-auto cursor-pointer'
    >
      <MediaImage media={media} type='person' carousel={carousel} />
      <h3 className='font-medium'>{media?.name}</h3>
    </motion.article>
  );
}
