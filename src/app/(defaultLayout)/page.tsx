import { Metadata } from 'next';

import MediaCard from '@/components/MediaCard';

export const metadata: Metadata = {
  title: {
    absolute: 'About',
  },
};

export default function Home() {
  const movieData = {
    image: '/images/me.png',
    date: 2017,
    mediaType: 'string',
    rating: 'PG',
    title: 'The Great Lands',
  };
  return (
    <>
      <MediaCard data={movieData} />
    </>
  );
}
