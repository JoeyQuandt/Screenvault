'use client';
import { useState } from 'react';

import SearchInput from '@/components/input/SearchInput';
import MediaCarousel from '@/components/MediaCarousel';
import MediaGrid from '@/components/MediaGrid';

export default function Home() {
  /*Search value*/
  const [SearchInputValue, setSearchInputValue] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const movieCarousel = [
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
  ];
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
      <SearchInput
        placeholder='Search for movies or TV series'
        maxWidth={false}
        data={movieData}
      />

      <MediaCarousel title='Trending' data={movieCarousel} />
      <MediaGrid title='Recommened for you' data={movieData} />
    </>
  );
}
