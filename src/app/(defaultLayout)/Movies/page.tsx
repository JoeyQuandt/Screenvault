'use client';
import { useState } from 'react';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { TvList } from 'database.ds';
import { useRef } from 'react';

import { getTheMovieDBMovieFilter } from '@/lib/TheMovieAPI';
import Transition from '@/lib/transition';

import MediaGrid from '@/components/MediaGrid';
import Filter from '@/components/filter/Filter';

import Loading from '@/app/loading';

const genres = [
  { value: '28', label: 'Action' },
  { value: '12', label: 'Adventure' },
  { value: '16', label: 'Animation' },
  { value: '35', label: 'Comedy' },
  { value: '80', label: 'Crime' },
  { value: '99', label: 'Documentary' },
  { value: '18', label: 'Drama' },
  { value: '10751', label: 'Family' },
  { value: '14', label: 'Fantasy' },
  { value: '36', label: 'History' },
  { value: '27', label: 'Horror' },
  { value: '10402', label: 'Music' },
  { value: '9648', label: 'Mystery' },
  { value: '10749', label: 'Romance' },
  { value: '878', label: 'Science Fiction' },
  { value: '10770', label: 'TV Movie' },
  { value: '53', label: 'Thriller' },
  { value: '10752', label: 'War' },
  { value: '37', label: 'Western' },
];

const sortByList = [
  { value: 'popularity.desc', label: 'Popularity Descending' },
  { value: 'populairty.asc', label: 'Popularity Ascending' },
  { value: 'vote.average.desc', label: 'Rating Descending' },
  { value: 'vote_average_asc', label: 'Rating Ascending' },
  { value: 'first_air_date_desc', label: 'First Air Date Descending' },
  { value: 'first_air_date_asc', label: 'First Air Date Ascending' },
];

export default function Home() {
  // Temporary filter state
  const [tempFilters, setTempFilters] = useState({
    selectedGenres: [] as string[],
    selectedSortByList: ['popularity.desc'],
    score: [7.5],
    voteCount: [100],
    selectedStatus: ['0'],
  });

  // Applied filter state
  const [appliedFilters, setAppliedFilters] = useState(tempFilters);

  const handleApplyFilters = () => {
    setAppliedFilters(tempFilters); // Apply the temporary filters
  };

  const { data, fetchNextPage, isError, isLoading } = useInfiniteQuery<TvList>({
    queryKey: [
      'trending-tv-data',
      appliedFilters.selectedSortByList,
      appliedFilters.selectedGenres,
      appliedFilters.score,
      appliedFilters.voteCount,
    ],
    queryFn: ({ pageParam = 1 }) =>
      getTheMovieDBMovieFilter(
        appliedFilters.selectedSortByList,
        appliedFilters.score[0],
        appliedFilters.selectedGenres.join(),
        pageParam as number,
        appliedFilters.voteCount[0],
      ),
    initialPageParam: 1,
    getNextPageParam: (pages) => pages.page + 1,
  });

  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });
  /*Ref for infinite loading*/
  if (entry?.isIntersecting) fetchNextPage();

  if (isError) return <h1>error</h1>;

  if (isLoading) return <Loading />;

  return (
    <Transition>
      <div className='flex justify-between items-center'>
        <h2 className='text-white mt-6 mb-6 md:mt-9'>Movies</h2>
        <Filter
          sortByList={sortByList}
          appliedFilters={appliedFilters}
          handleSortByListChange={(value) =>
            setTempFilters((prev) => ({ ...prev, selectedSortByList: value }))
          }
          genres={genres}
          handleGenresChange={(value) =>
            setTempFilters((prev) => ({ ...prev, selectedGenres: value }))
          }
          score={tempFilters.score}
          handleScoreChange={(value) =>
            setTempFilters((prev) => ({ ...prev, score: value }))
          }
          voteCount={tempFilters.voteCount}
          handleVoteCountChange={(value) =>
            setTempFilters((prev) => ({ ...prev, voteCount: value }))
          }
          onSearch={handleApplyFilters}
        />
      </div>
      {data?.pages.map((page, i) => (
        <div key={i}>
          <MediaGrid data={page.results} type='movie' ref={ref} />
        </div>
      ))}
    </Transition>
  );
}
