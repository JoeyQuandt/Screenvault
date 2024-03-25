import { Metadata } from 'next';

import SearchInput from '@/components/input/SearchInput';
import MediaGrid from '@/components/MediaGrid';

export const metadata: Metadata = {
  title: {
    absolute: 'About',
  },
};

export default function Movies() {
  const movieData = [
    {
      image: '/images/mastersoftheair.png',
      date: 2017,
      mediaType: 'string',
      rating: 'PG',
      title: 'Masters of the Air',
    },
    {
      image: '/images/monarch.png',
      date: 2017,
      mediaType: 'string',
      rating: 'PG',
      title: 'Monarch',
    },
    {
      image: '/images/pachinko.png',
      date: 2017,
      mediaType: 'string',
      rating: 'PG',
      title: 'Pachinko',
    },
    {
      image: '/images/slowhorses.png',
      date: 2017,
      mediaType: 'string',
      rating: 'PG',
      title: 'Slowhorses',
    },
    {
      image: '/images/forallmankind.png',
      date: 2017,
      mediaType: 'string',
      rating: 'PG',
      title: 'For all mankind',
    },
    {
      image: '/images/mastersoftheair.png',
      date: 2017,
      mediaType: 'string',
      rating: 'PG',
      title: 'Masters of the Air',
    },
    {
      image: '/images/monarch.png',
      date: 2017,
      mediaType: 'string',
      rating: 'PG',
      title: 'Monarch',
    },
    {
      image: '/images/pachinko.png',
      date: 2017,
      mediaType: 'string',
      rating: 'PG',
      title: 'Pachinko',
    },
    {
      image: '/images/slowhorses.png',
      date: 2017,
      mediaType: 'string',
      rating: 'PG',
      title: 'Slowhorses',
    },
    {
      image: '/images/forallmankind.png',
      date: 2017,
      mediaType: 'string',
      rating: 'PG',
      title: 'For all mankind',
    },
    {
      image: '/images/mastersoftheair.png',
      date: 2017,
      mediaType: 'string',
      rating: 'PG',
      title: 'Masters of the Air',
    },
    {
      image: '/images/monarch.png',
      date: 2017,
      mediaType: 'string',
      rating: 'PG',
      title: 'Monarch',
    },
    {
      image: '/images/pachinko.png',
      date: 2017,
      mediaType: 'string',
      rating: 'PG',
      title: 'Pachinko',
    },
    {
      image: '/images/slowhorses.png',
      date: 2017,
      mediaType: 'string',
      rating: 'PG',
      title: 'Slowhorses',
    },
    {
      image: '/images/forallmankind.png',
      date: 2017,
      mediaType: 'string',
      rating: 'PG',
      title: 'For all mankind',
    },
  ];
  return (
    <>
      <SearchInput placeholder='Search for Movies' maxWidth={false} />
      <MediaGrid title='Movies' data={movieData} />
    </>
  );
}
