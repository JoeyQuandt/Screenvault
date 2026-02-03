'use client';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { TvList, TvSortBy } from 'database.ds';
import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import { getTheMovieDBList } from '@/lib/theMovieApi';
import Transition from '@/lib/transition';

import Filter from '@/components/filter/Filter';
import MediaGrid from '@/components/MediaGrid';

import Loading from '@/app/loading';

const genres = [
  { value: '10759', label: 'Action & Adventures' },
  { value: '16', label: 'Animation' },
  { value: '35', label: 'Comedy' },
  { value: '80', label: 'Crime' },
  { value: '99', label: 'Documentary' },
  { value: '18', label: 'Drama' },
  { value: '10751', label: 'Family' },
  { value: '10762', label: 'Kids' },
  { value: '9648', label: 'Mystery' },
  { value: '10763', label: 'News' },
  { value: '10764', label: 'Reality' },
  { value: '10765', label: 'Sci-fi & Fantasy' },
  { value: '10766', label: 'Soap' },
  { value: '10767', label: 'Talk' },
  { value: '10768', label: 'War & Politics' },
  { value: '37', label: 'Western' },
];

const sortByList = [
  { value: 'popularity.desc', label: 'Popularity Descending' },
  { value: 'popularity.asc', label: 'Popularity Ascending' },
  { value: 'vote_average.desc', label: 'Rating Descending' },
  { value: 'vote_average.asc', label: 'Rating Ascending' },
  { value: 'first_air_date.desc', label: 'First Air Date Descending' },
  { value: 'first_air_date.asc', label: 'First Air Date Ascending' },
  { value: 'name.desc', label: 'Name Descending' },
  { value: 'name.asc', label: 'Name Ascending' },
  { value: 'original_name.desc', label: 'Original Name Descending' },
  { value: 'original_name.asc', label: 'Original Name Ascending' },
];

export default function TvClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Derive applied filters from URL
  const appliedFilters = useMemo(() => {
    return {
      selectedGenres:
        searchParams.get('with_genres')?.split(',').filter(Boolean) || [],
      selectedSortByList: [searchParams.get('sort_by') || 'popularity.desc'],
      score: [parseFloat(searchParams.get('vote_average_gte') || '7.5')],
      voteCount: [parseInt(searchParams.get('vote_count_gte') || '100', 10)],
      selectedStatus: ['0'],
    };
  }, [searchParams]);

  // Temporary filter state for the UI
  const [tempFilters, setTempFilters] = useState(appliedFilters);

  // Sync temp filters when URL changes
  useEffect(() => {
    setTempFilters(appliedFilters);
  }, [appliedFilters]);

  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    if (tempFilters.selectedGenres.length > 0) {
      params.set('with_genres', tempFilters.selectedGenres.join(','));
    }
    params.set('sort_by', tempFilters.selectedSortByList[0]);
    params.set('vote_average_gte', tempFilters.score[0].toString());
    params.set('vote_count_gte', tempFilters.voteCount[0].toString());

    router.replace(`${pathname}?${params.toString()}`);
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
      getTheMovieDBList(
        appliedFilters.selectedSortByList[0] as TvSortBy,
        appliedFilters.score[0],
        appliedFilters.selectedGenres.join(),
        pageParam as number,
        appliedFilters.voteCount[0],
      ),
    initialPageParam: 1,
    getNextPageParam: (pages) => pages.page + 1,
  });

  const { ref, entry } = useIntersection({
    threshold: 1,
  });
  /*Ref for infinite loading*/
  if (entry?.isIntersecting) fetchNextPage();

  if (isError) return <h1>error</h1>;

  if (isLoading) return <Loading />;

  return (
    <Transition>
      <div className='flex justify-between items-center'>
        <h2 className='text-white mt-6 mb-6 md:mt-9'>Tv</h2>
        <Filter
          sortByList={sortByList}
          appliedFilters={tempFilters}
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
          <MediaGrid data={page.results} type='tv' ref={ref} />
        </div>
      ))}
    </Transition>
  );
}
